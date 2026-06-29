import { useEffect, useState } from "react";
import api from "../services/api";

export default function NotificationBell({ studentId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 1. On récupère l'ID passé en prop, ou on tente de le récupérer depuis le localStorage (auth)
    let currentStudentId = studentId;
    
    if (!currentStudentId) {
      const storedUser = localStorage.getItem("user"); // ou le nom de ta clé de session
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        currentStudentId = parsedUser.id || parsedUser.student_id;
      }
    }

    // 2. Si après vérification on n'a TOUJOURS PAS d'ID, on log l'erreur pour comprendre
    if (!currentStudentId) {
      console.warn("NotificationBell : Impossible de charger les notifications car 'studentId' est introuvable (undefined). Vérifie ton composant parent ou le localStorage.");
      return;
    }

    console.log(` Chargement des notifications pour l'étudiant ID: ${currentStudentId}`);

    // 3. Appel à ton API FastAPI
    api.get(`/student/notifications/${currentStudentId}`)
      .then(res => {
        console.log("Notifications reçues du backend :", res.data);
        setNotifications(res.data);
      })
      .catch(err => console.error("Erreur lors de la récupération des notifications:", err));

  }, [studentId]);

  // Compteur des notifications non lues
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAsRead = async (id) => {
    try {
      await api.put(`/student/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (err) {
      console.error("Erreur lors du marquage comme lu :", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-circle bg-white/20 border-0 hover:bg-white/30 text-white relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto text-gray-800 border border-gray-100">
          <div className="p-4 border-b font-bold bg-gray-50 rounded-t-xl">
            Notifications
          </div>
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">Aucune notification</div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${!n.is_read ? "bg-blue-50 font-semibold" : ""}`}
              >
                <p className="text-sm text-gray-700">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {n.created_at ? new Date(n.created_at).toLocaleString("fr-FR") : "Date inconnue"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}