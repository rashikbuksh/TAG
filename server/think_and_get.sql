-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2023 at 07:25 PM
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
(15, 'oil', 'https://www.google.com');

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
(3, 'Buksh', NULL, NULL, NULL, 'buksh', 'rafsan123', '01684545111', 'rashik@gmail.com', '730/5/1, Block-C, Khilgaon, Dhaka', 1, 2, 3, 'no', 'customer'),
(6, 'Rashik Buksh', NULL, NULL, NULL, 'rbr', 'rafsan123', '01709305072', 'rbr@gmail.com', '730/5/1, Block-C, Khilgaon, Dhaka', NULL, NULL, NULL, NULL, 'customer'),
(10, 'Rashik Buksh', NULL, NULL, NULL, NULL, 'rafsan123', NULL, 'rashik@gmail.com', '23.7507983__90.4219536', NULL, NULL, NULL, NULL, 'shopper'),
(11, 'buksh', NULL, NULL, NULL, NULL, 'buksh1234', NULL, 'buksh@gmail.com', '23.7517979__90.4219168', NULL, NULL, NULL, NULL, 'shopper');

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

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `shopper_product_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `like_count` int(11) NOT NULL DEFAULT 0,
  `comment_count` int(11) NOT NULL DEFAULT 0,
  `share_count` int(11) NOT NULL DEFAULT 0,
  `rating` double NOT NULL DEFAULT 0,
  `category` varchar(255) NOT NULL,
  `post_content` varchar(255) NOT NULL,
  `post_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `shopper_product_id`, `shop_id`, `date`, `discount`, `duration`, `location`, `like_count`, `comment_count`, `share_count`, `rating`, `category`, `post_content`, `post_img`) VALUES
(2, 14, 3, '2023-08-16T00:57:01.662Z', '0', '', '', 0, 0, 0, 0, 'regular', '', ''),
(3, 15, 3, '2023-08-16T00:59:00.797Z', '5', '', '', 0, 0, 0, 3.55, 'regular', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `notification_content` varchar(255) DEFAULT NULL,
  `notification_time` date DEFAULT NULL,
  `unread` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(13, NULL, 'sugar', '1691920308947__Welcome Scan.jpg', '10', '10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_order`
--

CREATE TABLE `product_order` (
  `id` int(11) NOT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `customer_profile_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_order`
--

INSERT INTO `product_order` (`id`, `product_id`, `price`, `discount`, `order_status`, `customer_profile_id`) VALUES
(4, '1,2', 1039, '10,5', 'pending', 3),
(8, '2', 2850, '5', 'pending', 3),
(9, '3,1', 489, '0,10', 'pending', 6),
(10, '3,1', 489, '0,10', 'pending', 3),
(15, '1,2', 1039, '10,5', 'pending', 3);

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
  `shopper_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopper_product`
--

INSERT INTO `shopper_product` (`id`, `name`, `price`, `discount`, `product_count`, `sale_count`, `wishlist_count`, `rating_count`, `product_id`, `shopper_id`) VALUES
(1, 'gg product', 99, 10, 100, 1, 2, 3, 1, 11),
(2, 'gg 8', 1000, 5, 50, 0, 0, 0, 11, 10),
(3, 'Vanity Bag', 200, 0, 100, 0, 0, 0, 12, 10),
(4, 'sugar', 10, 0, 100, 0, 0, 0, 13, 11),
(8, 'Vanity Bag', 100, 2, 25, 0, 0, 0, 12, 3),
(14, 'sugar', 25, 0, 100, 0, 0, 0, 13, 3),
(15, 'Vanity Bag', 499, 5, 100, 0, 0, 0, 12, 3);

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
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `customer_profile`
--
ALTER TABLE `customer_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hero_slider`
--
ALTER TABLE `hero_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `shopper_product`
--
ALTER TABLE `shopper_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
