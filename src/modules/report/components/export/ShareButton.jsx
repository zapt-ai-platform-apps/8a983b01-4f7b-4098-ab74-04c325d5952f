import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../ui/components/Button';
import Modal from '../../../ui/components/Modal';
import { useToastContext } from '../../../ui/providers/ToastProvider';

const ShareButton = ({ handleExport }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToastContext();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    
    try {
      setIsSending(true);
      
      // In a real app, you'd send the email here
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Report shared with ${email}`);
      setIsModalOpen(false);
      setEmail('');
    } catch (error) {
      toast.error('Failed to share report: ' + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsModalOpen(true)}
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        }
      >
        Share
      </Button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Share Report"
      >
        <form onSubmit={handleEmailSubmit}>
          <p className="mb-4 text-gray-600">
            Enter an email address to share this report with a colleague.
          </p>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="colleague@example.com"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              isDisabled={isSending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSending}
              isDisabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Report'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

ShareButton.propTypes = {
  handleExport: PropTypes.func.isRequired,
};

export default ShareButton;