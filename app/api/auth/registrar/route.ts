
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res : NextResponse) {
    try {

        const { nomeuser, email, password } = await req.json();
        console.log("registro: ",{ nomeuser, email, password });

        const exists = await prisma.user.findFirst({
            where: {
                OR: [
                    { nomeuser: nomeuser },
                    { email: email }
                ]
            }
        })

        if (exists) {
            console.log('User already exists!')
            return NextResponse.json({ message: 'Username or Email Already Exists.' }, {
                status: 500
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10 );
        await prisma.user.create({
            data: {
                nomeuser: nomeuser,
                email: email,
                palavrapasse: hashedPassword
            }
        })

        return NextResponse.json({ message: 'User Registered' }, { status: 201 });

    } catch (error) {
        console.log("Error while Registeing", error);
        return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
    }
}