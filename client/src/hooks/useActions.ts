import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppDispatch } from '../redux/store'
import allActionCreators from '../redux/reducers/actionCreators'

const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(allActionCreators, dispatch)
}

export default useActions
