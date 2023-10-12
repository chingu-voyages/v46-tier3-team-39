export default function Hero() {
    return (
        /* url for hero background goes in bg-[url(')] */
        <div className="w-full text-center py-40 text-White font-bold bg-[url('')]">
            <p className="text-sm my-6">Innovative</p>
            <h1 className="text-4xl">Preparing You Better</h1>
            <p className="text-sm">Learn more about our story and mission.</p>
            <div className="flex w-64 m-auto my-6 justify-center font-thin">
                <button className="bg-Black p-1 mx-2">Learn More</button>
                <button className="border-2 p-1">Sign Up</button>
            </div>
        </div>
    )
}