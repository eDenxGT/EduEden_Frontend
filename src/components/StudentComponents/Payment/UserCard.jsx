import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Card from '@/components/CommonComponents/Card';
import { cardAnimation } from '../../utils/animations';

const UserCard = ({ studentData }) => {
  return (
    <motion.div whileHover="hover" initial="rest" animate="rest">
      <Card className="p-8 bg-white backdrop-blur-lg bg-opacity-90 hover:shadow-xl transition-shadow duration-300">
        <motion.div variants={cardAnimation} className="relative">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <User size={24} className="text-[#FF5722]" />
            <span>Account Details</span>
          </h2>
          
          <div className="space-y-6">
            {Object.entries({
              Name: studentData.name,
              Email: studentData.email,
              Phone: studentData.phone || 'Not provided'
            }).map(([label, value]) => (
              <motion.div 
                key={label}
                whileHover={{ scale: 1.02 }}
                className="transform transition-all duration-300"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">{label}</span>
                  <span className="font-medium text-lg text-gray-800">{value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default UserCard;