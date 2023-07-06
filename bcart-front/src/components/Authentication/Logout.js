export default function Logout() {
  sessionStorage.clear();
  return (window.location = "/");
}
