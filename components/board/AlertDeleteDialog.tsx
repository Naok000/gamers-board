import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement, useRef } from 'react';
import CommonButton from '../CommonButton';

type Props = {
  action: () => Promise<void>;
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  dialogHeader: string;
  dialogBody: string;
};

const AlertDeleteDialog = ({
  action,
  icon,
  dialogHeader,
  dialogBody,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <CommonButton
        icon={icon}
        mx={1}
        size='sm'
        scheme='red'
        variant='solid'
        clickAct={onOpen}
        text='Delete'
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {dialogHeader}
            </AlertDialogHeader>

            <AlertDialogBody>{dialogBody}</AlertDialogBody>

            <AlertDialogFooter>
              <CommonButton
                reference={cancelRef}
                clickAct={onClose}
                text='Cancel'
              />
              <CommonButton
                scheme='red'
                clickAct={() => action()}
                ml={3}
                text='Delete'
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDeleteDialog;
