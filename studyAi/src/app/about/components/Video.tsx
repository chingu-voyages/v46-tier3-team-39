export default function Video() {
    return (
        <div className="py-16 px-5 sm:py-28 sm:px-16 text-center m-auto">
            <div className="max-w-7xl m-auto">
                <h1 className="font-bold text-5xl sm:text-9xl">Empowering students to succeed through innovative AI-driven exam preparation.</h1>
                <p className="mt-2 sm:text-3xl">
                    At our company, we are driven by a mission to provide students with the most effective and comprehensive 
                    exam preparation tools. Our vision is to revolutionize the way students study and achieve their academic goals. 
                    We are guided by our core values of excellence, innovation, and student success.
                </p>
            </div>
            <video className="w-10/12 mt-5 mx-auto" poster="/placeholderImages/video.png"></video>
        </div>
    )
}