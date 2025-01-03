import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ListItem from "../components/ListItem";
import { PlusIcon } from "lucide-react";
import { type IApp } from "../types";
import PasswordForm from "../components/PasswordForm";
import SearchInput from "../components/SearchInput";
import useAxiosInterceptors from "../hooks/useAxiosInterceptors";
import { api } from "../utils";

type Apps = IApp[];

const Home = () => {
  useAxiosInterceptors();
  const [showModal, setShowModal] = useState(false);
  const [apps, setApps] = useState<Apps>([]);
  const [, setAppsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState("");
  const [q, setQ] = useState("");

  const handleToggleModal = () => {
    setShowModal((prev) => {
      return !prev;
    });
  };

  const handleSaveModal = async (formData: Omit<IApp, "_id">) => {
    try {
      const res = await api.post(`/api/`, formData);

      setApps((prev) => [...prev, res.data]);

      handleToggleModal();
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/api/${id}`);
      const cpy = [...apps];

      setApps(cpy.filter((app) => app._id !== res.data.id));
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const handleCopyPassword = async (id: string) => {
    try {
      setPasswordLoading(id);
      const res = await api.get(`/api/${id}/decrypt`);

      navigator.clipboard.writeText(res.data.decoded);

      alert("Password copied to clipboard");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setPasswordLoading("false");
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setAppsLoading(true);
      setQ(e.target.value);
      const res = await api.get(`/api/search?q=${e.target.value}`);

      setApps([...res.data.apps]);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setAppsLoading(false);
    }
  };

  // const handleViewPassword = async (id: string) => {
  //   try {
  //     setPasswordLoading(true);
  //     const res = await api.get(`/api/${id}/decrypt`);
  //     const copy = [...apps];
  //     const idx = copy.findIndex((e) => e._id === id);
  //     if (idx != -1) copy[idx].password = res.data.decoded;

  //     setApps(copy);
  //   } catch (error) {
  //     if (error instanceof Error) console.log(error);
  //   } finally {
  //     setPasswordLoading(false);
  //   }
  // };

  useEffect(() => {
    setAppsLoading(true);

    const fetchPasswordApps = async () => {
      try {
        setAppsLoading(true);
        const res = await api.get("/api/search?limi=100");

        setApps(res.data.apps);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setAppsLoading(false);
      }
    };

    fetchPasswordApps();
  }, []);

  return (
    <>
      <div className="mt-14 grid sm:grid-cols-1 gap-12 xs:grid-cols-1">
        <div className="w-full">
          <div className="flex justify-between my-3 w-full">
            <h1 className="text-2xl">Your Passwords</h1>
            <Button onClick={handleToggleModal}>
              <PlusIcon size={"12"} />
            </Button>
          </div>

          <div className="mb-4">
            <SearchInput value={q} onChange={handleSearch} />
          </div>

          <div className="flex justify-start flex-col">
            {apps.length === 0 && <p>No apps added</p>}
            {apps.map((app) => {
              return (
                <ListItem
                  key={app._id}
                  {...app}
                  loading={passwordLoading}
                  onDelete={handleDelete}
                  onCopy={handleCopyPassword}
                />
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-500 text-white p-4">{error}</div>
      )}

      <Modal
        title="New Application"
        show={showModal}
        onClose={() => setShowModal((prev) => !prev)}
      >
        <PasswordForm
          onSave={handleSaveModal}
          onCancel={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleToggleModal();
          }}
        ></PasswordForm>
      </Modal>
    </>
  );
};

export default Home;
