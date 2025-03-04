import moment from 'moment';

function FormattedDate(props) {
  const { dateString } = props;
  const placeholderDate = '—'; // Or any preferred placeholder

  const isValidDate = moment(dateString).isValid();

  let formattedDate = isValidDate ? moment(dateString).format("Do MMMM HH:mm") : placeholderDate;

  return <div>{formattedDate}</div>;
}

export default FormattedDate;
