import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ButtonLoadMore onClick={onClick} type="button">
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
