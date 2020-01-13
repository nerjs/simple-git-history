import { display } from 'react-icons-kit/icomoon/display'
import { alertTriangle } from 'react-icons-kit/feather/alertTriangle'
import { loadC } from 'react-icons-kit/ionicons/loadC'
import { chevronRight } from 'react-icons-kit/ionicons/chevronRight'

export default ({ loading, error, current, currentIcon, icon }) =>
    loading
        ? loadC
        : error
        ? alertTriangle
        : current
        ? currentIcon || chevronRight
        : icon || display
