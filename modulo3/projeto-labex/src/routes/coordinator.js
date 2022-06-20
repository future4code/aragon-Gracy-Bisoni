export const goToHomePage = (navigate) => {
    navigate ("/")
};

export const goToAdminPage = (navigate) => {
    navigate("/admin")
};

export const goToTripDetails = (navigate, tripId) => {
    navigate(`/admin/${tripId}/details`)
}