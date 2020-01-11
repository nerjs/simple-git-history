import { display } from 'react-icons-kit/icomoon/display'
import { alertTriangle } from 'react-icons-kit/feather/alertTriangle'
import { loadC } from 'react-icons-kit/ionicons/loadC'
import { chevronRight } from 'react-icons-kit/ionicons/chevronRight'

export default ({ pathname, loading, error, current }) =>
    loading ? loadC : error ? alertTriangle : pathname === current ? chevronRight : display
