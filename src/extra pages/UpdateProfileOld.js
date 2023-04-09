import axios from 'axios'
import React, { useState } from 'react'

const UpdateProfileOld = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setAMobile] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault();
   

    if (name == "") {
      window.alert('Please enter your updated name.')
    }

    else if (email == "") {
      window.alert('Please enter your updated email address.')
    }

    else if (gender == "") {
      window.alert('Please select your gender.')
    }

    else if (address == "") {
      window.alert('Please enter your updated address.')
    }

    else if (mobile == "") {
      window.alert('Please enter your updated mobile number.')
    }

    else {

      let obj = localStorage.getItem('Object')
      let a = JSON.parse(obj)
      console.log(a)
      let userID = a.user_id;
      //  console.log(userID)

      const data2 = {
        user_id: userID,
        user_name: name,
        user_email: email,
        user_gender: gender,
        user_address: address,
        user_mobile: mobile,
      };
      // console.log(data2)

      axios({
        method: "post",
        url: "https://akashsir.in/myapi/ecom1/api/api-user-update.php",
        data: data2,
        headers: { 'Content-Type': "multipart/form-data" }

      })
        .then((value) => {
          // console.log(value.data.flag)
          if (value.data.flag == 1) {
            console.log(value.data)
            setName(value.data.user_name)
            setEmail(value.data.user_email);
            setGender(value.data.user_gender);
            setAddress(value.data.user_address)
            setAMobile(value.data.user_mobile)
            window.alert('Your profile is updated successfully.')
            setName("")
            setEmail('')
            setGender('')
            setAddress('')
            setAMobile('')

          }


        })
        .catch((error) => {
          console.log(error)
        })


    }
  }


  return (
    <React.Fragment>
      <br />
      <h2>Update Profile</h2>   <br />

      <form onSubmit={(e1) => handleSubmit(e1)}>
        <input type='text' name='name' placeholder='Enter your name.' value={name} onChange={(e) => setName(e.target.value)} /> <br /><br />
        <input type='email' name='email' placeholder='Enter your email.' value={email} onChange={(e) => setEmail(e.target.value)} /> <br /> <br />
        Gender : <label htmlFor='male'> Male <input name='gender' value='Male' id='male'  type='radio' onChange={(e) => setGender(e.target.value)} /> </label>
        <label htmlFor='female'>Female <input type='radio' id='female' value='Female' name='gender' onChange={(e) => setGender(e.target.value)} /> </label>  <br /> <br />
        <textarea cols='30' rows='5' name='address' placeholder='Enter your address.' value={address} onChange={(e) => setAddress(e.target.value)} />  <br /> <br />
        <input type='number' name='mobile' placeholder='Enter mobile number.' value={mobile} onChange={(e) => setAMobile(e.target.value)} /> <br /> <br />
        <input type='submit' />
      </form>
    </React.Fragment>
  )
}

export default UpdateProfileOld


