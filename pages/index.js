import Head from 'next/head';
import { createRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Home() {
  const [email, setEmail] = useState('');
  const recaptchaRef = createRef();
  
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // Execute the reCAPTCHA when the form is submitted
    console.log('Form has been submitted');
    recaptchaRef.current.execute();
  };

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    console.log('Caputure Code', captchaCode);
    if (!captchaCode) return;
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    alert(`Hey, ${email}`);
    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRef.current.reset();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
            className="border=[1px] "
          />
          <input
            onChange={handleChange}
            required
            type="email"
            name="email"
            placeholder="Email"
            className="border-gray-500 border-[1px] py-1 rounded px-3 bg-red"
          />
          <button
            type="submit"
            className="text-blue-500 border-zinc-800 border-[1px] px-6 py-1 rounded ml-4"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
