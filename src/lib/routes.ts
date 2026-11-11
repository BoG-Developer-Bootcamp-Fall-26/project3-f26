export const routes = {
  login: "/login",
  createAccount: "/create-account",

  trainingLogs: "/training",
  newTrainingLog: "/training/new",
  editTrainingLog: (logId: string) => `/training/${logId}/edit`,

  animals: "/animals",

  adminTraining: "/admin/training",
  adminAnimals: "/admin/animals",
  adminUsers: "/admin/users",
};
