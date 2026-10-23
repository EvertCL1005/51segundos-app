import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        { message: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { message: 'El correo electrónico ya está registrado' },
        { status: 400 }
      );
    }

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
      },
    });

    return NextResponse.json(
      { message: 'Usuario registrado exitosamente', usuario: nuevoUsuario },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}