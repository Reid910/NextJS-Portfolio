'use client'

import React, { useState, useRef, useEffect, useCallback } from "react";

import Background from "@/components/D3Components/Background";
import ScrollingFrame from "@/components/D3Components/ScrollingFrame";
import Dropdown from "@/components/D3Components/Dropdown";
import { GetSeasonIndex, GetSeasonLeaderboardTypes, GetSeasonalLeaderboard } from '@/modules/API_requests';
import { UppercaseFirstLetters } from '@/modules/stringFuncs';

// import slugMap from '@/modules/slugMap.json';
// import displayMap from '@/modules/displayNameMap.json';
import RankDisplay from "@/components/D3Components/RankDisplay";

interface options {
    value: string,
    txt?: string
}

interface leaderboard {
    ladder: { href: Required<string> },
    team_size?: number,
    hero_class_string?: string,
}

interface LeaderboardData { // this is the data structure from the Blizzard API
    // _links: {href:string},
    achievement_points?: boolean,
    
    column: column[],
    
    generated_by: string,
    key: string,
    last_update_time: string,
    
    row: row[],
    
    season?: number,
    title: {en_US: string} // title has other languages
}

interface column { // part of data
    id: string,
    hidden: boolean,
    label: {en_US: string}
    order?: number,
    type: string,
}
interface row { // part of data
    data: rowData[],
    order: number,
    player: player[],
}

interface rowData { // ( ids are: Rank, AchievementPoints, CompletedTime, BattleTag ) ( these differ based on the leaderboard selected )
    id: string,
    number?: number,
    string?: string,
    timestamp?: number,
}

interface player {
    accountId: number,
    data: playerData[],
    key: string,
}

interface playerData {
    id: string,
    number?: number,
    string?: string,
}

export type { options, leaderboard, LeaderboardData, column, row, rowData, player, playerData }

export default function Leaderboard() {
    // const [SearchBar, setSearchBar] = useState("");
    const [Search, setSearch] = useState("");
    
    const [Region, SetRegion] = useState('us');
    const [Season, SetSeason] = useState<number | undefined>(undefined);
    const [Hardcore, SetHardcore] = useState<boolean>(false);
    const [Party, SetParty] = useState('Any');
    const [Leaderboard, SetLeaderboard] = useState('achievement-points');
    
    const [Data, setData] = useState<LeaderboardData | undefined>(undefined);
    const [Loading, setLoading] = useState(true);
    
    const [FilteredLb, SetFilteredLb] = useState<options[]>([{'value':'achievement-points'}]);
    
    const PartyOptions = useRef([{'value':'Any'}]);
    const LeaderboardOptions = useRef([{'value':'achievement-points'}]);
    const TitleHasHardcode = useRef(false);
    const currentSeason = useRef<number | null>(null);
    const seasons = currentSeason.current ? Array.from({ length: currentSeason.current }, (_, i) => ({ value: (i + 1).toString() })) : []; // thank you gpt!
    
    const regions = [ // hard coded regions used to choose regions from dropdown menu
        {'value':'us'},
        {'value':'eu'},
        {'value':'kr'},
        {'value':'tw'},
    ]
    
    const FilterLeaderboardOptions = useCallback(() => {
        const LBFilter = LeaderboardOptions.current.filter(e => {
            return !isNaN(Number(e.value)) ||
            (Party === "Any" && e.value.includes('achievement')) ||
            ((Party === "Any" || e.value.includes(Party)) && Hardcore === e.value.includes('hardcore'));
        });
        SetFilteredLb(LBFilter);
        SetLeaderboard(LBFilter[0]?.value ?? 'achievement-points');
    }, [Party, Hardcore]);
    
    useEffect(() => { // get season index ( current season )
        GetSeasonIndex(Region).then((seasonsList) => {
            if (!seasonsList) return;
            currentSeason.current = seasonsList.current_season;
            SetSeason(seasonsList.current_season);
        })
    }, [Region]);
    
    useEffect(() => { // get types of leaderboards for this season
        if (!Season) {return} // do not run without a season selected ( auto selects most recent season after first render )
        GetSeasonLeaderboardTypes(Region,Season).then((leaderboardTypes) => {
            const partyOptions: options[] = [{'value':'Any','txt':'Any Party'}];
            const UniqueParties = new Map();
            const leaderboardOptions: options[] = [];
            console.log(leaderboardTypes);
            leaderboardTypes.leaderboard?.forEach((ele: leaderboard) => {
                const lb_slug = ele.ladder?.href.split("/").slice(-1)[0].split("?")[0] // gets only the leaderboard slug
                leaderboardOptions.push({'value':lb_slug,'txt':UppercaseFirstLetters(lb_slug.replace(/-/g,' '))});
                // console.log(ele, displayMap[ele.hero_class_string]);
                UniqueParties.set(ele.team_size == 1 ? ele.hero_class_string : ele.team_size, {'team_size':ele.team_size,'hero_class_string':ele.hero_class_string})
            })
            
            console.log(UniqueParties);
            
            UniqueParties.forEach(({team_size, hero_class_string}: {team_size?: number, hero_class_string?: string}) => {
                if (team_size && team_size > 1) {
                    partyOptions.push({'value':`team-${team_size}`,'txt':`Team of ${team_size}`});
                }
                else if (hero_class_string) {
                    const slug = hero_class_string;
                    hero_class_string = hero_class_string == 'dh' ? 'Demon Hunter' : hero_class_string == 'wd' ? 'Witch Doctor' : UppercaseFirstLetters(hero_class_string);
                    partyOptions.push({'value':slug,'txt':`Solo ${hero_class_string}`});
                }
            });
            
            LeaderboardOptions.current = leaderboardOptions;
            // FilterLeaderboardOptions();
            PartyOptions.current = partyOptions;
        })
    }, [Region, Season])
    
    useEffect(() => {
        FilterLeaderboardOptions();
    }, [Party, Hardcore, FilterLeaderboardOptions]);
    
    useEffect(() => {
        setLoading(true);
        GetSeasonalLeaderboard(Region,Season,Leaderboard).then((Data) => {
            setData(Data);
            console.log(Data);
            TitleHasHardcode.current = Data?.title?.en_US.toLowerCase().includes('hardcore');
            setLoading(false);
        })
    }, [Region,Season,Leaderboard,Hardcore])
    
    // useEffect(FilterLeaderboardOptions, [Party,Hardcore]); // this allows the leaderboard list (dropdown menu) to update
    
    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }
    
    function handleHardcore(value: string) {
        SetHardcore(value === "true");
    }
    
    console.log("Data:", Data);
    console.log("Data.row:", Data?.row);
    
    return (
        <Background>
            <h1 className="w-full mb-4 text-center text-6xl font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-b from-green-600 to-emerald-400">Seasonal Leaderboard</h1>
            
            <div className="flex mb-4 text-2xl text-sky-500 justify-center text-center font-bold">
                <h1 className="text-gray-500 italic">Displaying:</h1>
                <u className="ml-4 text-lg text-amber-700">
                    <h1 className=" text-2xl text-gray-300">
                        {/* {'Season ' + Season} */}
                    </h1>
                </u>
                {/* <h1 className="ml-4 text-gray-300 italic">{'Season ' + Season + ' '}</h1> */}
                <u className="ml-4 text-lg text-emerald-500">
                    <h1 className=" text-2xl text-gray-300">
                        {/* {Data?.title?.en_US} */}
                    </h1>
                </u>
            </div>
            
            {/* {Data?.conquest_desc && <h1 className="mx-auto mb-4 p-2 w-2/3 text-center text-md text-white border border-gray-800 rounded-lg">
                <u className="text-lg">Conquest Description</u>{': ' + Data?.conquest_desc?.en_US}
            </h1>} */}
            
            <div className='rounded-3xl w-full h-[90vh] px-3 mb-10 py-5 flex flex-col border-2 border-gray-800'> {/* flex container for search and dropdown menus */}
                <div className="flex flex-row my-3 px-2"> {/* flex container for search and dropdown menus */}
                    <h1 className='flex flex-row my-2 mr-2 text-emerald-500 font-bold italic'>Select a Leaderboard:</h1>
                    {/* DROPDOWN MENUS */}
                    <Dropdown
                        label='Region'
                        Selected={Region}
                        Options={regions}
                        setSelectedStat={SetRegion}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Season'
                        Selected={Season}
                        Options={seasons}
                        setSelectedStat={SetSeason}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Hardcore'
                        Selected={Hardcore.toString()}
                        Options={[{value:'true','txt':'Yes'},{value:'false','txt':'No'}]}
                        setSelectedStat={handleHardcore}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Rift Party'
                        Selected={Party}
                        Options={PartyOptions.current}
                        setSelectedStat={SetParty}
                        className='flex justify-end relative ml-2'
                    />
                    <Dropdown
                        label='Leaderboard'
                        Selected={Leaderboard}
                        // FilteredLb={FilteredLb}
                        Options={FilteredLb}
                        setSelectedStat={SetLeaderboard}
                        className='flex justify-end relative ml-2'
                    />
                </div>
                
                <div className="flex flex-row mb-3"> {/* flex container for search and dropdown menus */}
                    <div className="flex flex-1 text-sm"> {/* SEARCH BAR (updates search every keystroke) */}
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search - ( Name, Clan, Class )"
                            className="w-full p-2 z-5 border border-gray-600 rounded-md bg-gray-900 text-white
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:shadow-xl focus:shadow-sky-700 duration-100"
                        />
                    </div>
                </div>
                
                <ScrollingFrame>
                    {Loading || !Data ? (
                        <h1 className="w-full my-10 text-center text-3xl font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-sky-400 to-blue-900">Loading...</h1>
                    ) : (
                        // <h1>Hello</h1>
                        Data.row.map(Team => {
                            // console.log("-------", Team)
                            // console.log(Team);
                            const lower_search = Search.toLowerCase();
                            // if search is empty keep all elements or check match
                            const Show = (Search.trim() === "") || Team.player.some(player => player.data.some(
                                val => val.id !== "GameAccount" && val.id !== "HeroVisualItems" && (val.number || val.string)?.toString().toLowerCase().includes(lower_search)
                            ))
                            if (!Show) {
                                return
                            }
                            // hiding elements instead of removing them makes it faster to show and hide while searching? I hope?
                            // return <RankDetail key={Team.order} Show={true} Data={Data} Team={Team} ></RankDetail>
                            return <RankDisplay key={Team.order} Data={Data} Team={Team}></RankDisplay>
                        })
                    )}
                </ScrollingFrame>
            </div>
            
            
        </Background>
    );
}
