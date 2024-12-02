import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ListItem from "../components/ListItem";
import { PlusIcon } from "lucide-react";
import AppDetail from "../components/AppDetail";
import { type IApp } from "../types";
import ApplicationForm from "../components/ApplicationForm";
import SearchInput from "../components/SearchInput";
import useAxiosInterceptors from "../hooks/useAxiosInterceptors";
import { api } from "../utils";

type Apps = IApp[];

const Home = () => {
  useAxiosInterceptors();
  const [showModal, setShowModal] = useState(false);

  const [apps, setApps] = useState<Apps>([]);

  const [, setAppsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [passwordLoading, setPasswordLoading] = useState(false);

  const [selectedApp, setSelectedApp] = useState<IApp | null | undefined>(null);

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

  const handleAppClick = (id: string) => {
    const app: IApp | undefined = apps.find((obj) => obj._id === id);
    setSelectedApp(app);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/api/${id}`);
      setApps((prev) => prev.filter((app) => app._id !== res.data));
      setSelectedApp(null);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const handleAddApp = (app: IApp) => {
    const index = apps.findIndex((obj) => obj._id === app._id);

    const copy = [...apps];

    copy[index] = app;
    if (index != -1) {
      setApps([...copy]);
      setSelectedApp(app);
    }
  };

  const handleViewPassword = async (id: string) => {
    try {
      setPasswordLoading(true);
      const res = await api.get(`/api/${id}/decrypt`);
      const copy = [...apps];
      const idx = copy.findIndex((e) => e._id === id);
      if (idx != -1) copy[idx].password = res.data.decoded;

      setApps(copy);
    } catch (error) {
      if (error instanceof Error) console.log(error);
    } finally {
      setPasswordLoading(false);
    }
  };

  useEffect(() => {
    setAppsLoading(true);

    api
      .get("/api/")
      .then((res) => {
        console.log(res.data);
        setApps(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setAppsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="mt-14 grid sm:grid-cols-custom-2 gap-12 xs:grid-cols-1">
        <div className="w-full">
          <div className="flex justify-between my-3 w-full">
            <h1 className="text-2xl">Your Passwords</h1>
            <Button onClick={handleToggleModal}>
              <PlusIcon size={"12"} />
            </Button>
          </div>

          <div className="mb-4">
            <SearchInput />
          </div>

          <div className="flex justify-start flex-col">
            {apps.length === 0 && <p>No apps added</p>}
            {apps.map((app) => {
              return (
                <ListItem
                  key={app._id}
                  {...app}
                  onClick={handleAppClick}
                  current={selectedApp?._id === app._id}
                />
              );
            })}
          </div>
        </div>

        <div>
          {!selectedApp ? (
            <div className="flex items-center flex-col gap-4 justify-center h-full">
              <h1 className="text-5xl font-bold">Personal Password Manager</h1>
              <p>Maning my passwords myself</p>
            </div>
          ) : (
            <AppDetail
              app={selectedApp}
              onDelete={handleDelete}
              onSave={handleAddApp}
              onViewPassword={handleViewPassword}
              passwordLoading={passwordLoading}
            />
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-500 text-white p-4">{error}</div>
      )}

      <Modal title="New Application" show={showModal}>
        <ApplicationForm
          onSave={handleSaveModal}
          onCancel={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleToggleModal();
          }}
        ></ApplicationForm>
      </Modal>
    </>
  );
};

export default Home;
