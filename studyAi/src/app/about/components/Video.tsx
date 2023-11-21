export default function Video() {
  return (
    <div className="py-16 px-5 sm:py-24 sm:px-16 text-center m-auto">
      <div className="max-w-6xl m-auto text-center">
        <h1 className="font-bold text-6xl sm:text-7xl">
          Empowering students to succeed through innovative AI-driven exam
          preparation.
        </h1>
        <p className="mt-2 pl-2 pr-2 text-center sm:text-1xl">
          At our company, we are driven by a mission to provide students with
          the most effective and comprehensive exam preparation tools. Our
          vision is to revolutionize the way students study and achieve their
          academic goals. We are guided by our core values of excellence,
          innovation, and student success.
        </p>
      </div>
      <video className="w-9/12 mt-10 mx-auto" autoPlay={true} loop muted>
        <source src="/AI-Video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
