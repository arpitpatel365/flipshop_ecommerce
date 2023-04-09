import axios from 'axios';
import React from 'react';
import {useState} from 'react';

function SignUpOld() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [gender,setGender]=useState('');
    const [mobile,setMobile]=useState('');
    const [address,setAddress]=useState('');

   const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('user_name',name);
        formData.append('user_email',email);
        formData.append('user_password',password);
        formData.append('user_gender',gender);
        formData.append('user_mobile',mobile);
        formData.append('user_address',address);

        axios.post('https://akashsir.in/myapi/ecom1/api/api-signup.php',formData)
        .then(function(res){
            console.log(res.data);
            if(res.data.flag==1 && res.data.message=="Your registration successfully"){
                var a=res.data.message;
                console.log(`Account Created+${a}`);
                alert('Account created successfully.')
                
            }

            else if(res.data.message=="Email already exist"){
                window.alert("Email address already exist.")
            }
            else{
                alert("Enter all required details");
            }
        })
        .catch(function(res){
            console.log(res);
        })

       
    }

    return(
        <React.Fragment>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
           Name : <input type='text' name='name' onChange={(e)=>{setName(e.target.value)}} value={name} /> <br/>
           Email : <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} /> <br/>
           Password : <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}} /> <br/>
           Gender :  <input type='text' name='gender' onChange={(e)=>setGender(e.target.value)} /> <br/>
           Mobile : <input type='text' name='mobile' onChange={(e)=>{setMobile(e.target.value)}} /> <br/>
          Address : <textarea name='address' onChange={(e)=>setAddress(e.target.value)} /> <br/><br/>
          <input type='submit' value='Register'/>
          </form>
          
            
        </React.Fragment>
    );
}

export default SignUpOld;
   

