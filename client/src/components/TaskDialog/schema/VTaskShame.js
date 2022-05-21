import * as yup from 'yup'

const schema = yup
    .object()
    .shape({
        name: yup.string().required('Поле обязательно для ввода'),
        tiketState: yup.string().required('Поле обязательно для ввода'),
        implementer: yup.string().required('Поле обязательно для ввода'),
        description: yup.string().required('Поле обязательно для ввода'),
        priority: yup.string().required('Поле обязательно для ввода'),
        deadline: yup.date().required('Поле обязательно для ввода'),
    })
    .required()

export default schema