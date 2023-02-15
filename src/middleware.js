
import { NextResponse } from "next/server"

export default function middleware(req) {
    let token = req.cookies.get('token')
    let url = req.url

    
    if(!token && url.includes('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}