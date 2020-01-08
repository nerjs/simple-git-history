import { display } from 'react-icons-kit/icomoon/display'
import { alertTriangle } from 'react-icons-kit/feather/alertTriangle'
import { loader } from 'react-icons-kit/feather/loader'

export default (current, list) => {
    let icon = display,
        title = '...'

    const curForList = list.find(({ pathname }) => pathname === current)

    if (curForList) {
        if (curForList.loading) icon = loader
        if (curForList.error) icon = alertTriangle

        title = curForList.name || curForList.pathname
    } else {
        icon = alertTriangle
        title = 'Not found!...'
    }

    return { icon, title }
}
