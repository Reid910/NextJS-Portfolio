'use client';

import { RiftTime, RiftColor } from '@/modules/RiftTime';
import Image from 'next/image';
import PlayerDetail from '@/components/D3Components/PlayerDetail';

type PlayerDataEntry = {
  id: string;
  string?: string;
  number?: number;
  timestamp?: number;
};

type Player = {
  data: PlayerDataEntry[];
};

type ColumnData = {
  id: string;
  label: {
    en_US: string;
  };
};

type RankProps = {
  Data: {
    conquest?: boolean;
    greater_rift?: boolean;
    hardcore?: boolean;
    column: ColumnData[];
  };
  Team: {
    order: number;
    player: Player[];
    data: PlayerDataEntry[];
  };
};

export default function Rank({ Data, Team }: RankProps) {
  console.log('------------------------ Rankdetail running');

  const Labels = Data.conquest
    ? ['CompletedTime']
    : Data.greater_rift
    ? ['RiftLevel', 'RiftTime', 'CompletedTime']
    : ['AchievementPoints', 'CompletedTime'];

  const Rank = Team.order;
  const IsHardcore = Data?.hardcore || false;

  const rankColors: Record<number | 'default', string> = {
    1: 'border-2 border-red-700 bg-red-950 shadow-red-500 shadow-xl',
    2: 'border-2 border-amber-600 bg-amber-950 shadow-amber-600 shadow-xl',
    3: 'border-2 border-yellow-500 bg-yellow-900 shadow-yellow-900 shadow-lg',
    default: 'border-2 border-gray-700 bg-gray-900',
  };

  const RankColor: string = rankColors[Rank as keyof typeof rankColors] || rankColors.default;
  const HcColor = IsHardcore ? 'red' : 'green';

  return (
    <div
      key={Team.order}
      className={`border-2 border-b--6 border-gray-700 rounded-md mt-1 hover:shadow-lg hover:shadow-sky-600 hover:border-sky-500 duration-300`}
    >
      <div key={Team.order} className="flex mt-1">
        <div className={`flex flex-row gap-2 px-2 place-items-center justify-start`}>
          {Team.player.map((player, index) => {
            const HeroClass = player.data.find(e => e.id === 'HeroClass')?.string || 'unknown';
            const HeroGender = player.data.find(e => e.id === 'HeroGender')?.string === 'm' ? 'male' : 'female';

            const HeroClassSlug =
              HeroClass === 'necromancer'
                ? 'p6_necro'
                : HeroClass === 'crusader'
                ? 'x1_crusader'
                : HeroClass.replace(' ', '');

            return (
              <Image
                key={index}
                className={`flex rounded-full border w-12 h-12 flex items-center justify-center shadow-lg border-${HcColor}-500 bg-${HcColor}-950 shadow-${HcColor}-700`}
                src={`https://assets.diablo3.blizzard.com/d3/icons/portraits/64/${HeroClassSlug}_${HeroGender}.png`}
                width={64}
                height={64}
                alt="Hero"
              />
            );
          })}
        </div>
        {Labels.map(l => {
          const column = Data.column.find(e => e.id === l);
          const title = column?.label.en_US || l;
          const value_obj = Team.data.find(e => e.id === l);
          const value = value_obj?.string || value_obj?.number || value_obj?.timestamp || 0;
          const time = RiftTime(value);
          const display_value =
            l === 'CompletedTime'
              ? new Date(value).toLocaleDateString()
              : l === 'RiftTime'
              ? RiftTime(value)
              : value;

          return (
            <div key={l} className="flex-2 items-center justify-between bg-gray-900 rounded-md m-1">
              <div className="flex flex-col items-center">
                <p className="text-xs text-gray-400">{title}</p>
                <p
                  style={l === 'RiftTime' ? { color: RiftColor(time) } : undefined}
                  className="text-xs font-bold text-white p-2 text-center"
                >
                  {display_value}
                </p>
              </div>
            </div>
          );
        })}
        <div className={`flex-1 items-center justify-between rounded-md m-1 z-1 ${RankColor}`}>
          <div className="flex flex-col items-center">
            <p className="text-xs text-white">{'RANK'}</p>
            <p className="text-sm font-bold text-white">{Rank}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-2 w-full">
        {Team.player.map((player, index) => (
          <PlayerDetail key={index} player={player} />
        ))}
      </div>
    </div>
  );
}

// export default function Rank({Show, Data, Team}: {Show: boolean}) {
    
//     console.log("------------------------ Rankdetail running");
    
//     const Labels = Data.conquest ? ['CompletedTime'] : Data.greater_rift ? ['RiftLevel', 'RiftTime', 'CompletedTime'] : ['AchievementPoints', 'CompletedTime'];
    
//     const Rank = Team.order;
    
//     const IsHardcore = Data?.hardcore || false;
    
//     const rankColors = {
//         1: "border-2 border-red-700 bg-red-950 shadow-red-500 shadow-xl",
//         2: "border-2 border-amber-600 bg-amber-950 shadow-amber-600 shadow-xl",
//         3: "border-2 border-yellow-500 bg-yellow-900 shadow-yellow-900 shadow-lg",
//         default: "border-2 border-gray-700 bg-gray-900"
//     };
    
//     const RankColor: string = rankColors[Rank] || rankColors.default;
    
//     const HcColor = IsHardcore ? 'red' : 'green';
    
//     return (
//         <div key={Team.order}
//             className={
//                 `border-2 border-b--6 border-gray-700 rounded-md mt-1 hover:shadow-lg
//                 hover:shadow-sky-600 hover:border-sky-500 duration-300` // ${!Show ? 'hidden' : ''}
//             }>
//             <div key={Team.order} className='flex mt-1'>
//                 {/* <div className={`flex-1 place-items-center grid grid-cols-2 gap-2 border`}> */}
//                 <div className={`flex flex-row gap-2 px-2 place-items-center justify-start`}>
//                     {Team.player.map((player,index) => {
//                         const HeroClass = player.data.find(e=>e.id==='HeroClass').string;
//                         const HeroGender = player.data.find(e=>e.id==='HeroGender') == 'm' ? 'male' : 'female';
//                         // console.log(HeroClass,HeroGender)
//                         const HeroClassSlug = HeroClass == 'necromancer' ? 'p6_necro' : HeroClass == 'crusader' ? 'x1_'+HeroClass : HeroClass.replace(' ','')
//                         return <Image
//                             key={index}
//                             className={`flex rounded-full border w-12 h-12 flex items-center justify-center shadow-lg border-${HcColor}-500 bg-${HcColor}-950 shadow-${HcColor}-700`}
//                             src={`https://assets.diablo3.blizzard.com/d3/icons/portraits/64/${HeroClassSlug}_${HeroGender}.png`}
//                             width={64}
//                             height={64}
//                             alt="Hero"
//                         />
//                     })}
//                 </div>
//                 {Labels.map(l => {
//                     const title = Data.column.find(e=>e.id==l).label.en_US;
//                     const value_obj = Team.data.find(e=>e.id===l);
//                     const value = value_obj.string || value_obj.number || value_obj.timestamp;
//                     const time = RiftTime(value);
//                     const display_value = l=='CompletedTime' ? new Date(value).toLocaleDateString() : l=='RiftTime' ? RiftTime(value) : value;
//                     return (
//                         <div key={l} className="flex-2 items-center justify-between bg-gray-900 rounded-md m-1">
//                             <div className="flex flex-col items-center">
//                                 <p className="text-xs text-gray-400">{title}</p>
//                                 <p style={l=='RiftTime' && {color: RiftColor(time)} || undefined} className="text-xs font-bold text-white p-2 text-center">{display_value}</p>
//                             </div>
//                         </div>
//                     )
//                 })}
//                 <div className={`flex-1 items-center justify-between rounded-md m-1 z-1 ${RankColor}`}>
//                     {/* Leaderboard Stat */}
//                     <div className="flex flex-col items-center">
//                         <p className="text-xs text-white">{'RANK'}</p>
//                         <p className="text-sm font-bold text-white">{Rank}</p>
//                     </div>
//                 </div>
//             </div>
            
//             <div className="flex flex-col p-2 w-full"> {/* this is my display for player names, levels, class, and clan name */}
//                 {console.log(Team.player)}
//                 {Team.player.map((player, index) => {
//                     console.log(player,index)
//                     return <PlayerDetail key={index} index={index} player={player} /> // this is my player detail ( it shows name, rank, level etc...)
//                 })}
//             </div>
//         </div>
//     )
// }
