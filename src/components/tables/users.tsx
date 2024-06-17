"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ButtonIcon from "../ui/button-icon";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import ModalUser from "../modal/modal_user";
import Form from "@/components/ui/form";
import Select from "../ui/select";
import Pagination from "../pagination/pagination";

interface User {
  id: number;
  user: string;
  email: string;
  password: string;
  rol: string;
}

const User: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 4; // Show 4 documents per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = async (id: number, rol: string) => {
    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, rol }),
      });

      if (!response.ok) {
        throw new Error("Failed to update users status");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, rol } : user))
      );
    } catch (error) {
      console.error("Error updating user status:", error);
      // Manejar el error si es necesario
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete users");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting users:", error);
      // Manejar el error si es necesario
    }
  };
  const maskPassword = (password: string): string => {
    const halfLength = Math.ceil(password.length / 2);
    const maskedPart = password.substring(0, halfLength);
    return maskedPart + " ...";
  };

  const registerUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = users.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const updateUserList = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
      <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-800">
        Lista de Usuarios
      </h4>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-600 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">N°</th>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Contraseña</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {currentDocuments.map((user, id) => (
              <tr key={id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3 text-sm font-semibold">{user.id}</td>
                <td className="px-4 py-3 text-sm font-semibold">{user.user}</td>
                <td className="px-4 py-3 text-sm font-semibold">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm font-semibold">
                  {maskPassword(user.password)}
                </td>
                <td className="px-4 py-3 text-sm font-semibold">
                  <Select
                    className={`rounded-full px-2 py-1 font-semibold leading-tight ${
                      user.rol === "Administrador"
                        ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                        : user.rol === "Empleado"
                        ? "text-blue-700 bg-blue-100 dark:bg-blue-700 dark:text-blue-100"
                        : ""
                    }`}
                    value={user.rol}
                    onChange={(e: any) => {
                      const newStatus = e.target.value;
                      updateUser(user.id, newStatus);
                    }}
                    options={[
                      { label: "Administrador", value: "Administrador" },
                      { label: "Empleado", value: "Empleado" },
                    ]}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2 text-md">
                    <ButtonIcon
                      icon={MdAdd}
                      onClick={() => registerUser(user)}
                    />
                    <ButtonIcon
                      icon={RiDeleteBin5Fill}
                      onClick={() => deleteUser(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={documentsPerPage}
        totalItems={users.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {showModal && (
        <ModalUser handleShowModal={() => setShowModal(false)}>
          <Form updateUserList={updateUserList} />
        </ModalUser>
      )}
    </div>
  );
};

export default User;
