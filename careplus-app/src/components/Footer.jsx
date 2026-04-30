// Componente de rodapé global da aplicação
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Care Plus — Jornada Gamificada do Cuidado Contínuo</p>
      <p>FIAP — Engenharia de Software | 1º Ano</p>
    </footer>
  );
}
