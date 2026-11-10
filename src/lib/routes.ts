export const routes = {
  login: "/login",
  createAccount: "/create-account",

  trainingLogs: "/training-logs/dashboard",
  newTrainingLog: "/training-logs/new",
  editTrainingLog: (logId: string) => `/training-logs/${logId}/edit`,

  animals: "/animals",

  adminTraining: "/admin/training",
  adminAnimals: "/admin/animals",
  adminUsers: "/admin/users",
};
