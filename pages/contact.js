import React, { useState } from 'react'
import styles from '../styles/Contact.module.css'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone, desc);
    const data = { name, email, phone, desc };
    fetch('http://localhost:3000/api/postcontact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Success:', data);
        alert('Thanks for Submitting');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
    if (e.target.name == "desc") {
      setDesc(e.target.value);
    }
  }
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.htmlFormlable}>Enter Your Name</label>
          <input type="text" value={name} onChange={handleChange} className={styles.input} id="name" name='name' aria-describedby="emailHelp" />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.htmlFormlable}>Email Address</label>
          <input type="email" value={email} onChange={handleChange} className={styles.input} id="email" name='email' aria-describedby="emailHelp" />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.htmlFormlable}>Phone</label>
          <input type="phone" value={phone} onChange={handleChange} className={styles.input} id="phone" name='phone' />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.htmlFormlable}>Description</label>
          <textarea className={styles.input} value={desc} name="desc" onChange={handleChange} placeholder="Write Description here" id="desc" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Contact;