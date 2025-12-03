const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">About DevTinder</h1>
      <p className="text-lg leading-7">
        DevTinder is a modern matchmaking platform for developers to connect,
        collaborate, and build exciting projects together. Our mission is to
        create a space where developers can network, find teammates, and grow
        their careers through meaningful collaborations.
      </p>

      <p className="mt-4 text-lg leading-7">
        This application is built using the MERN stack, Socket.IO for real-time
        chat, and TailwindCSS for UI styling. 
      </p>

      <p className="mt-4 text-md opacity-80">
        Version: <strong>1.0.0</strong>
      </p>
    </div>
  );
};

export default About;
