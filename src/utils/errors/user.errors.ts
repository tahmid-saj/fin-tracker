// user errors

export const errorOnCreatingUser = (error: Error) => {
  alert(`Error creating the user ${error.message}`)
};

export const errorOnUserSignIn = (error: Error) => {
  alert(`Error signing in ${error.message}`);
};

export const errorOnEmailAlreadyInUse = () => {
  alert(`Email already in use`);
};

export const errorOnUserCreation = (error: Error) => {
  alert(`User creation ${error.message}`);
};
