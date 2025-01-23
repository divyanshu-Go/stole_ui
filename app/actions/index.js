'use server'

import { signIn, signOut } from "@/auth";

export async function doLogin(FormData){

    const action = FormData.get('action');
    console.log(action);
    await signIn(action, {redirectTo:"/profile"});
}


export async function doLogout(){

    await signOut({redirect: "/"});
}