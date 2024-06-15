import { IconType } from "react-icons";

interface Props {
    icon: IconType,
    onClick: () => void,
}

const AuthSocialButton : React.FC<Props> = ({
    // to use as a component
    icon: Icon,
    onClick
}) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className="
                inline-flex
                w-full
                justify-center
                rounded-md
                bg-white
                px-4
                py-2
                text-grey-500
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                hover:bg-grey-50
                focus:outline-offset-0
            "
        >
            <Icon/>
        </button>
    );
};

export default AuthSocialButton;