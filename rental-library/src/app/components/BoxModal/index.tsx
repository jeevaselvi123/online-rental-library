import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function BasicModal({ open, onClose }: { open: boolean, onClose: () => void}) {

    const handleClose = () => onClose();

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-white border border-gray-800 shadow-md p-4">
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                        className="text-2xl font-bold mb-4">
                        Share this post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-gray-700 items-center justify-center">
                        {/* Add your social media icons and links here */}
                        <a href="#" target="_blank" className="mr-4">
                            <FacebookIcon />
                        </a>
                        <a href="#" target="_blank" className="mr-4">
                            <XIcon />
                        </a>
                        <a href="#" target="_blank" className="mr-4">
                            <InstagramIcon />
                        </a>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}