const getProfileData = (user: any) => {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_email_verified: user.is_email_verified
    }
}

export { getProfileData }