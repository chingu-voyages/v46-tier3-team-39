export default function Hero() {
    return (
        /* url for hero background goes in bg-[url(')] */
        <div className="w-full p-2 text-center text-White bg-[url('/placeholderImages/heroMobile.png')] bg-no-repeat bg-center bg-cover sm:bg-[url('/placeholderImages/heroDesktop.png')] sm:py-24">
            <p className="text-md my-6">Innovative</p>
            <h1 className="text-9xl font-bold">Preparing You Better</h1>
            <p className="text-sm my-2 font-light">Learn more about our story and mission.</p>
            <div className="flex w-64 m-auto my-6 justify-center font-extralight">
                <button className="bg-Black px-4 py-2 mx-2">Learn More</button>
                <button className="border-2 px-4 py-2">Sign Up</button>
            </div>
        </div>
    )
}