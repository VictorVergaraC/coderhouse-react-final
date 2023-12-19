import Swal from "sweetalert2"

export const getLsItem = (key) => JSON.parse(localStorage.getItem(key)) || null

export const setLsItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const showSimpleAlert = (icon, title, message) => {
    Swal.fire({
        title : title,
        text: message,
        icon: icon,
    })
}