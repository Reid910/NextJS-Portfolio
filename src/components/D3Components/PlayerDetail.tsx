import { UppercaseFirstLetters } from '@/modules/stringFuncs';

type PlayerDataEntry = {
    id: string;
    string?: string;
    number?: number;
};

type PlayerProps = {
    player: {
        data: PlayerDataEntry[];
    };
};

export default function Player({ player }: PlayerProps) {
    if (!player) {
        return null;
    }

    const HeroBattleTag = player.data.find(e => e.id === 'HeroBattleTag')?.string || 'Unknown';
    const HeroClass = player.data.find(e => e.id === 'HeroClass')?.string || 'Unknown';
    const HeroLevel = player.data.find(e => e.id === 'HeroLevel')?.number || 0;
    const ParagonLevel = player.data.find(e => e.id === 'ParagonLevel')?.number || 0;
    const ClanName = player.data.find(e => e.id === 'ClanName')?.string || 'No Clan';
    const ClanTag = player.data.find(e => e.id === 'ClanTag')?.string || '';

    return (
        <div className="flex flex-row items-center justify-between shadow-lg text-white text-sm rounded-md border-t-2 border-gray-900 text-center">
            <p className="px-2 flex-3 font-semibold text-gray-400">{HeroBattleTag}</p>
            <p className="px-2 flex-3 text-green-500">{ClanTag ? `[${ClanTag}] ${ClanName}` : ClanName}</p>
            <p className="px-2 flex-5 text-left text-red-500">{UppercaseFirstLetters(HeroClass)}</p>
            <p className="px-2 flex-2 text-amber-500">Level {HeroLevel}</p>
            <p className="px-2 flex-2 text-sky-600">Paragon {ParagonLevel}</p>
        </div>
    );
}
