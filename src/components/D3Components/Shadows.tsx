export default function Shadows () {
    return (<div className='pointer-events-none'>
        <div
            style={{background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))'}}
            className="fixed w-full h-35 top-0 z-50 pointer-events-none"
        />
        <div
            style={{background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))'}}
            className="fixed w-full h-5 bottom-0 z-50 pointer-events-none"
        />
    </div>)
}
