'use client';

import { useState } from 'react';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState<{ texto: string; error: boolean } | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setCargando(true);

    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrar');
      }

      setMensaje({ texto: '¡Registro exitoso! Guardado en la BD.', error: false });
      setNombre('');
      setEmail('');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
      setMensaje({ texto: errorMsg, error: true });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: '#fff', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#38bdf8' }}>51 Segundos - Registro</h2>
        
        {mensaje && (
          <div style={{ padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', backgroundColor: mensaje.error ? '#7f1d1d' : '#14532d', color: '#fff', fontSize: '0.9rem' }}>
            {mensaje.texto}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre Completo</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
            placeholder="Evert Chaverra"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Correo Electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {cargando ? 'Guardando...' : 'Registrarse'}
        </button>
      </form>
    </main>
  );
}