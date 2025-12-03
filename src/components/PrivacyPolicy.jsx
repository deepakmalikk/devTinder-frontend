const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="text-lg leading-7">
        Your privacy matters. DevTinder collects only the necessary information
        such as your name, profile details, and chat messages to provide a safe
        and seamless user experience.
      </p>

      <h2 className="text-xl font-semibold mt-6">What We Collect</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Name & Profile Details</li>
        <li>Profile Photo</li>
        <li>Chat messages</li>
        <li>Login session data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">How We Use Your Data</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>To match you with other developers</li>
        <li>To enable chat features</li>
        <li>To improve application performance</li>
      </ul>

      <p className="mt-6">
        We do not sell, trade, or share your information with external parties.
      </p>

      <p className="text-md opacity-80 mt-6">
        Last updated: <strong>Jan 2025</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
