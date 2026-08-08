import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Auravive</h1>
      <div className="prose prose-lg">
        <p>
          Auravive is a modern mental wellness platform designed to help people
          improve their emotional well-being through self-reflection, mindfulness,
          community support, and access to professional resources.
        </p>
        <h2>Our Mission</h2>
        <p>
          To make mental wellness accessible, affordable, and stigma-free for everyone.
        </p>
        <h2>Our Vision</h2>
        <p>
          A world where everyone has the tools and support they need to thrive
          mentally and emotionally.
        </p>
        <h2>Our Values</h2>
        <ul>
          <li>Compassion and Empathy</li>
          <li>Privacy and Security</li>
          <li>Inclusivity and Accessibility</li>
          <li>Evidence-Based Practices</li>
          <li>Community Support</li>
        </ul>
      </div>
    </div>
  );
};

export default About;