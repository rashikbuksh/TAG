-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2023 at 06:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `think_and_get`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `url`) VALUES
(1, 'gg', 'https://www.google.com'),
(2, 'Another', 'https://www.google.com'),
(3, 'gg 2', 'https://www.google.com'),
(12, 'gg 3', 'https://www.google.com'),
(13, 'Shoe', 'https://www.google.com'),
(14, 'Bag', 'https://www.google.com'),
(15, 'oil', 'https://www.google.com'),
(16, 'Cha Pata', 'https://www.google.com');

-- --------------------------------------------------------

--
-- Table structure for table `customer_profile`
--

CREATE TABLE `customer_profile` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `point` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `total_order` int(11) DEFAULT NULL,
  `to_be_shipped` int(11) DEFAULT NULL,
  `review_count` int(11) DEFAULT NULL,
  `offer` varchar(255) DEFAULT NULL,
  `access` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_profile`
--

INSERT INTO `customer_profile` (`id`, `name`, `image`, `point`, `level`, `user_name`, `password`, `phone`, `email`, `shipping_address`, `total_order`, `to_be_shipped`, `review_count`, `offer`, `access`) VALUES
(1, 'hasib', '[value-3]', '[value-4]', '[value-5]', 'hasibarrafiulfahim', 'hasib1234', '[value-8]', 'hasibarrafiulfahim@gmail.com', '[value-10]', 0, 0, 0, '[value-14]', 'customer'),
(2, 'Rashik Buksh', NULL, NULL, NULL, NULL, 'rafsan123', NULL, 'rashikbuksh@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer'),
(3, 'Buksh', NULL, NULL, NULL, 'buksh', 'rafsan123', '01684545111', 'rashik@gmail.com', '730/5/1, Block-C, Khilgaon, Dhaka', 1, 2, 3, 'no', 'shopper'),
(6, 'Rashik Buksh', NULL, NULL, NULL, 'rbr', 'rafsan123', '01709305072', 'rbr@gmail.com', '730/5/1, Block-C, Khilgaon, Dhaka', NULL, NULL, NULL, NULL, 'customer'),
(11, 'buksh', NULL, NULL, NULL, NULL, 'buksh1234', NULL, 'buksh@gmail.com', '23.7517979__90.4219168', NULL, NULL, NULL, NULL, 'shopper'),
(15, 'Rashik Buksh', NULL, NULL, NULL, NULL, 'rafsan123', '01684545112', 'rashikbuksh123@gmail.com', '23.7507983__90.4219536', NULL, NULL, NULL, NULL, 'shopper'),
(16, 'anik', NULL, NULL, NULL, NULL, '$2b$10$XoJbPYObeFN.dhLLpniv.e6uZbfuORw0YhAaYAXnDvPlfgjpXWk02', NULL, 'anik@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer'),
(17, 'anikU', NULL, NULL, NULL, NULL, '$2b$10$hLJbqslh/frc8Zp/.IyBv.tPItlpdjEmoEzEorlhDmLK8f1bHmI6K', '01684545113', 'anik123@gmail.com', '23.7507983__90.4219536', NULL, NULL, NULL, NULL, 'shopper'),
(18, 'RAFID BUKSH', NULL, NULL, NULL, NULL, '$2b$10$59OJMjepWmTnuNbiT5VR3uCK93oHNlBHmWm6GOlRNtsjkkkn7AXUK', NULL, 'rafid@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer'),
(19, 'RAFID BUKSH', NULL, NULL, NULL, NULL, '$2b$10$VeU3tFlgbCpCrsV2CQtMSupS9/JYqhBAMPWXEq7wEnBFj6iQWxZl6', NULL, 'rafid123@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer'),
(20, 'TAG@admin.com', NULL, NULL, NULL, NULL, '$2b$10$1R4tRAPwHpmV6EnGtAStUeJZY8aj0Dt9NR.B2fjgNiXSYkmH5rm46', NULL, 'tag@admin.com', NULL, NULL, NULL, NULL, NULL, 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `hero_slider`
--

CREATE TABLE `hero_slider` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_slider`
--

INSERT INTO `hero_slider` (`id`, `title`, `subtitle`, `image`) VALUES
(3, 'Leo', 'Leo', '1693821528877__2D1A8929.JPG'),
(4, 'Ishan Tea', 'Cha Pata From Sylhet', '1693929901663__20230807_154229.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `shopper_product_id` int(11) DEFAULT NULL,
  `shop_id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `like_count` int(11) DEFAULT 0,
  `comment_count` int(11) DEFAULT 0,
  `share_count` int(11) DEFAULT 0,
  `rating` double DEFAULT 0,
  `category` varchar(255) DEFAULT NULL,
  `post_content` varchar(255) NOT NULL,
  `post_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `shopper_product_id`, `shop_id`, `date`, `discount`, `duration`, `location`, `like_count`, `comment_count`, `share_count`, `rating`, `category`, `post_content`, `post_img`) VALUES
(7, NULL, 3, '2023-08-28T14:34:37.854Z', NULL, NULL, NULL, 0, 0, 0, 0, 'regular', 'ggwp', '1693233277825__pjimage-2-1024x683.jpg'),
(8, NULL, 3, '2023-09-04T10:02:04.081Z', NULL, NULL, NULL, 0, 0, 0, 0, 'regular', 'LEO', '1693821723899___D1A5127.JPG'),
(10, NULL, 17, '2023-09-05T16:44:03.716Z', NULL, NULL, NULL, 2, 0, 0, 0, 'regular', 'NEW PRODUCT IN TOWN', '1693932243669__20230807_154229.jpg'),
(13, 22, 17, '2023-09-08T11:06:36.919Z', '0', '', '', 2, 1, 0, 0, 'regular', '', ''),
(14, 23, 17, '2023-09-08T11:08:16.425Z', '10', '', '', 2, 2, 0, 0, 'regular', '', ''),
(15, 24, 17, '2023-09-08T11:09:09.030Z', '5', '', '', 2, 4, 0, 0, 'regular', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `news_comment`
--

CREATE TABLE `news_comment` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `commented_by` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `news_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_comment`
--

INSERT INTO `news_comment` (`id`, `news_id`, `commented_by`, `comment`, `news_time`) VALUES
(1, 10, 20, 'GG', '[value-5]'),
(2, 15, 20, 'Excellent', '9/19/2023, 9:18:42 PM'),
(3, 15, 20, 'Nice', '9/19/2023, 9:21:25 PM'),
(4, 14, 20, 'Nice', '9/19/2023, 9:21:37 PM'),
(5, 14, 20, 'Excellent', '9/19/2023, 9:25:36 PM'),
(6, 15, 20, 'Interested', '9/19/2023, 9:25:47 PM'),
(15, 13, 20, 'Excellent', '9/19/2023, 9:43:03 PM'),
(19, 15, 17, 'Excellent', '9/19/2023, 10:01:17 PM');

-- --------------------------------------------------------

--
-- Table structure for table `news_like`
--

CREATE TABLE `news_like` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `liked_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_like`
--

INSERT INTO `news_like` (`id`, `news_id`, `liked_by`) VALUES
(21, 15, 16),
(22, 14, 16),
(23, 13, 16),
(24, 10, 16),
(25, 10, 20),
(26, 13, 20),
(27, 14, 20),
(28, 15, 20);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `notification_content` varchar(255) DEFAULT NULL,
  `notification_time` varchar(255) DEFAULT NULL,
  `not_from` int(11) NOT NULL,
  `not_to` int(11) NOT NULL,
  `status` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `notification_content`, `notification_time`, `not_from`, `not_to`, `status`) VALUES
(1, 'Not asdasdasdsd', '12-12-12', 3, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `short_description` varchar(100) DEFAULT NULL,
  `full_description` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `sku`, `name`, `image`, `short_description`, `full_description`, `category_id`) VALUES
(1, NULL, 'gg product', 'WelcomeScan.jpg', '10', '10', 3),
(11, NULL, 'gg 8', '1689276807795__Welcome Scan.jpg', '10', '1010', 1),
(12, NULL, 'Vanity Bag', '1690478518635__Welcome Scan.jpg', 'Bag', 'Bag', 14),
(13, NULL, 'sugar', '1691920308947__Welcome Scan.jpg', '10', '10', 1),
(14, NULL, 'Ishan Tea', '1693931993449__20230807_154229.jpg', 'Cha pata', 'Cha pata From Sylhet', 16);

-- --------------------------------------------------------

--
-- Table structure for table `product_order`
--

CREATE TABLE `product_order` (
  `id` int(11) NOT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `customer_profile_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_order`
--

INSERT INTO `product_order` (`id`, `product_id`, `quantity`, `weight`, `price`, `discount`, `order_status`, `customer_profile_id`) VALUES
(4, '1,2', '1,1', '', 1039, '10,5', 'pending', 3),
(8, '2', '3', '', 2850, '5', 'pending', 3),
(9, '3,1', '2,1', '', 489, '0,10', 'pending', 6),
(10, '3,1', '2,1', '', 489, '0,10', 'pending', 3),
(15, '1,2', '1,1', '', 1039, '10,5', 'pending', 3),
(16, '1,2', '1,1', NULL, 1039, '10,5', 'pending', 3),
(17, '1', '1', '0', 89, '10', 'pending', 3);

-- --------------------------------------------------------

--
-- Table structure for table `shopper_product`
--

CREATE TABLE `shopper_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `product_count` int(11) NOT NULL,
  `sale_count` int(11) DEFAULT 0,
  `wishlist_count` int(11) DEFAULT 0,
  `rating_count` int(11) DEFAULT 0,
  `product_id` int(11) NOT NULL,
  `shopper_id` int(11) NOT NULL,
  `view` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopper_product`
--

INSERT INTO `shopper_product` (`id`, `name`, `price`, `discount`, `product_count`, `sale_count`, `wishlist_count`, `rating_count`, `product_id`, `shopper_id`, `view`) VALUES
(1, 'gg product', 99, 10, 100, 10, 2, 3, 1, 11, 3),
(4, 'sugar', 10, 0, 100, 11, 0, 0, 13, 11, 24),
(8, 'Vanity Bag', 100, 2, 25, 0, 0, 0, 12, 3, 0),
(14, 'sugar', 25, 0, 110, 0, 0, 0, 13, 3, 0),
(15, 'Vanity Bag', 499, 5, 100, 0, 0, 0, 12, 3, 1),
(17, 'sugar', 26, 0, 100, 0, 0, 0, 13, 15, 0),
(18, 'Ishan Tea', 75, 0, 10, 0, 0, 0, 14, 17, 1),
(22, 'Vanity Bag', 130, 0, 25, 0, 0, 0, 12, 17, 2),
(23, 'gg product', 200, 10, 100, 0, 0, 0, 1, 17, 2),
(24, 'sugar', 160, 5, 100, 0, 0, 0, 13, 17, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_profile`
--
ALTER TABLE `customer_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `hero_slider`
--
ALTER TABLE `hero_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shopper_product_id` (`shopper_product_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_id` (`news_id`),
  ADD KEY `commented_by` (`commented_by`);

--
-- Indexes for table `news_like`
--
ALTER TABLE `news_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liked_by` (`liked_by`),
  ADD KEY `news_id` (`news_id`) USING BTREE;

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordered_from` (`not_from`),
  ADD KEY `ordered_by` (`not_to`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_profile_id` (`customer_profile_id`);

--
-- Indexes for table `shopper_product`
--
ALTER TABLE `shopper_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `shopper_id` (`shopper_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `customer_profile`
--
ALTER TABLE `customer_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `hero_slider`
--
ALTER TABLE `hero_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `news_comment`
--
ALTER TABLE `news_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `news_like`
--
ALTER TABLE `news_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `shopper_product`
--
ALTER TABLE `shopper_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`shopper_product_id`) REFERENCES `shopper_product` (`id`),
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD CONSTRAINT `news_comment_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
  ADD CONSTRAINT `news_comment_ibfk_2` FOREIGN KEY (`commented_by`) REFERENCES `customer_profile` (`id`),
  ADD CONSTRAINT `news_comment_ibfk_3` FOREIGN KEY (`commented_by`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `news_like`
--
ALTER TABLE `news_like`
  ADD CONSTRAINT `news_like_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
  ADD CONSTRAINT `news_like_ibfk_3` FOREIGN KEY (`liked_by`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`not_from`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`not_to`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `product_order`
--
ALTER TABLE `product_order`
  ADD CONSTRAINT `product_order_ibfk_1` FOREIGN KEY (`customer_profile_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `shopper_product`
--
ALTER TABLE `shopper_product`
  ADD CONSTRAINT `shopper_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shopper_product_ibfk_2` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
