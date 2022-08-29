import { useConnectionStatus } from "../../hook/useConnectionStatus";
import { Container } from "./style";

export const ConnectionStatus = () => {
    const { status } = useConnectionStatus();

    return (
        <Container>
            {status ?
                <>
                    <span style={{ color: '#64bea3' }}>&#9679;</span>
                    {' online'}
                </> :
                <>
                    <span style={{ color: '#adadad' }}>&#9679;</span>
                    {' offline'}
                </>
            }
        </Container>
    );
};
