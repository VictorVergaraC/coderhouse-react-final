import Swal from "sweetalert2"

export const getLsItem = (key) => JSON.parse(localStorage.getItem(key)) || null

export const setLsItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const showSimpleAlert = (icon, title, message) => {
    return Swal.fire({
        title: title,
        text: message,
        icon: icon,
    })
}

export const isValidObject = (obj, arrAttributes) => {
    for (const atributo of arrAttributes) {
        if (!obj[atributo] || (typeof obj[atributo] === 'string' && obj[atributo].trim() === '')) {
            return false;
        }
    }
    return true;
}