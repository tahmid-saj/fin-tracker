// user errors

export const errorOnCreatingUser = (error) => {
  alert(`Error creating the user ${error.message}`)
};

export const errorOnUserSignIn = (error) => {
  alert(`Error signing in ${error.message}`);
};

export const errorOnEmailAlreadyInUse = () => {
  alert(`Email already in use`);
};

export const errorOnUserCreation = (error) => {
  alert(`User creation ${error.message}`);
};
