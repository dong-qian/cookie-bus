import React from "react";
import ImportCookie from "./features/importCookie";
import CreateProfile from "./features/createProfile";
import ProfileList from "./features/ProfileList";
import { Button, Toast } from "./elements";
import EditProfile from "./features/editProfile";
import useProfileStore from "./store/profilesStore";

const App = () => {
  const { state, dispatch, actionType } = useProfileStore();
  const {
    savedProfiles,
    currentProfile,
    selectionMode,
    creatationMode,
    editProfile,
    editMode,
    toast,
  } = state;

  return (
    <div className="main relative px-8 pt-8 pb-10 flex flex-col items-center text-center container mx-auto bg-gray-900">
      {savedProfiles.length === 0 ? (
        <div className="w-full">
          <CreateProfile
            onBack={() =>
              dispatch({ type: actionType.SET_CREATION_MODE, payload: true })
            }
            onSubmit={(profiles) => {
              dispatch({
                type: actionType.UPDATE_PROFILES,
                payload: profiles,
              });
            }}
          />
        </div>
      ) : (
        <>
          <div className="tracking-wider uppercase mb-4 text-white font-semibold text-lg">
            {currentProfile.name}
          </div>
          <ImportCookie
            disabled={selectionMode || creatationMode || editMode}
            currentProfile={currentProfile}
            onSubmit={(toast) =>
              dispatch({ type: actionType.SET_TOAST, payload: toast })
            }
          />

          {!selectionMode && !creatationMode && !editMode && (
            <div className="mt-4 w-full grid grid-cols-5 gap-5">
              <div className="col-span-3">
                <Button
                  onClick={() =>
                    dispatch({
                      type: actionType.SET_SELECTION_MODE,
                      payload: true,
                    })
                  }
                  secondary
                >
                  Change Profile
                </Button>
              </div>
              <div className="col-span-2">
                <Button
                  onClick={() =>
                    dispatch({
                      type: actionType.SET_CREATION_MODE,
                      payload: true,
                    })
                  }
                  secondary
                >
                  + New
                </Button>
              </div>
            </div>
          )}

          {selectionMode && (
            <div className="mt-5 w-full">
              <ProfileList
                profiles={savedProfiles}
                onSelect={(profile) =>
                  dispatch({
                    type: actionType.SET_CURRENT_PROFILE,
                    payload: profile,
                  })
                }
                currentProfile={currentProfile}
                onEdit={(profile) => {
                  dispatch({
                    type: actionType.SET_EDIT_MODE,
                    payload: true,
                  });
                  dispatch({
                    type: actionType.SET_EDIT_PROFILE,
                    payload: profile,
                  });
                }}
                onSubmit={(profiles) =>
                  dispatch({
                    type: actionType.UPDATE_PROFILES,
                    payload: profiles,
                  })
                }
              />
            </div>
          )}

          {creatationMode && (
            <div className="mt-5 w-full">
              <CreateProfile
                onBack={() =>
                  dispatch({
                    type: actionType.SET_CREATION_MODE,
                    payload: false,
                  })
                }
                onSubmit={(profiles) =>
                  dispatch({
                    type: actionType.UPDATE_PROFILES,
                    payload: profiles,
                  })
                }
              />
            </div>
          )}

          {editMode && (
            <div className="mt-5 w-full">
              <EditProfile
                editProfile={editProfile}
                onBack={() =>
                  dispatch({
                    type: actionType.SET_CREATION_MODE,
                    payload: false,
                  })
                }
                onSubmit={(profiles) =>
                  dispatch({
                    type: actionType.UPDATE_PROFILES,
                    payload: profiles,
                  })
                }
              />
            </div>
          )}
        </>
      )}
      {toast && (
        <div className="absolute inset-x-0 bottom-0 text-xs mb-5">
          <Toast toast={toast}></Toast>
        </div>
      )}
      <div className="absolute right-0 bottom-0 text-xs text-gray-600 mr-2 mb-2">
        Beta version 0.1.0
      </div>
    </div>
  );
};

export default App;
