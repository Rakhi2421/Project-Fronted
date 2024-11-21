import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

const ContactList = ({ contacts, onSelectContact }) => {
  return (
    <div className="divide-y divide-gray-200">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center p-4 hover:bg-gray-50"
        >
          <button
            onClick={() => onSelectContact(contact.id)}
            className="flex items-center space-x-2"
          >
            {contact.selected ? (
              <CheckSquare className="w-5 h-5 text-blue-500" />
            ) : (
              <Square className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <div className="ml-4 flex-1 flex items-center justify-between">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <span className="text-gray-900">{contact.name}</span>
              <span className="text-gray-600">{contact.email}</span>
            </div>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
              ${contact.status === 'failed_delivery' 
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {contact.status === 'failed_delivery' ? 'Failed Delivery' : 'Not Responded'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;