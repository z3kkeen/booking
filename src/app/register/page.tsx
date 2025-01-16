"use client"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from 'react';
 
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
 
  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({ 
        email, 
        password, 
        name, 
     }, { 
        onRequest: (ctx) => { 
         console.log('loading', ctx);
         
        }, 
        onSuccess: (ctx) => { 
          console.log('User created: ', ctx.data);
          router.push("/login");
        }, 
        onError: (ctx) => { 
          alert(ctx.error.message); 
        }, 
      }); 
  };
 
  return (
    <div className="h-screen w-full bg-zinc-800 flex items-center flex-col">
      <h1 className="text-4xl mt-20"><b>Register</b></h1>
      <div className="max-h-60 bg-zinc-500 flex flex-col justify-center items-center gap-3 mt-10 p-10 rounded-md">
        <input type="name" value={name} placeholder="Username" onChange={(e) => setName(e.target.value)} className="px-1 rounded-sm border-2 border-zinc-600"/>
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="px-1 rounded-sm border-2 border-zinc-600"/>
        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="px-1 rounded-sm border-2 border-zinc-600"/>
        <button onClick={signUp} className="px-2 rounded-md border-2 border-zinc-700 bg-zinc-600">Sign Up</button>
      </div>
      <a href="/login" className="mt-3 underline">already have an account?</a>
    </div>
  );
}