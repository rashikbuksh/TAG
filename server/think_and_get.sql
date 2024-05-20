-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2024 at 09:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
  `name` varchar(255) NOT NULL,
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
(16, 'Cha Pata', 'https://www.google.com'),
(17, 'Sauce', 'https://tailwindcss.com/docs/object-fit'),
(42, '1234', '');

-- --------------------------------------------------------

--
-- Table structure for table `customers_address_details`
--

CREATE TABLE `customers_address_details` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `address_title` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `geo_location` varchar(255) DEFAULT NULL,
  `phone_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers_address_details`
--

INSERT INTO `customers_address_details` (`id`, `customer_id`, `address_title`, `address`, `geo_location`, `phone_no`) VALUES
(11, 36, 'Home', 'k block haishahar chittagong', '91.788587_22.3307028', '01878601610'),
(15, 36, 'Amar basa', 'k block haishahar chittagong', '91.788587_22.3307028', '01878601610');

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
  `address` text DEFAULT NULL,
  `review_count` int(11) DEFAULT NULL,
  `offer` varchar(255) DEFAULT NULL,
  `access` varchar(255) NOT NULL,
  `active_status` tinyint(1) DEFAULT NULL,
  `refer_code` varchar(255) NOT NULL,
  `refer_status` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_profile`
--

INSERT INTO `customer_profile` (`id`, `name`, `image`, `point`, `level`, `user_name`, `password`, `phone`, `email`, `shipping_address`, `total_order`, `address`, `review_count`, `offer`, `access`, `active_status`, `refer_code`, `refer_status`, `profile_picture`) VALUES
(1, 'hasib', '[value-3]', '[value-4]', '[value-5]', 'hasibarrafiulfahim', 'hasib1234', '[value-8]', 'hasibarrafiulfahim@gmail.com', '[value-10]', 0, '0', 0, '[value-14]', 'customer', 0, '', NULL, NULL),
(2, 'Rashik Buksh', NULL, NULL, NULL, NULL, 'rafsan123', NULL, 'rashikbuksh@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(3, 'Buksh', NULL, NULL, NULL, 'buksh', '$2b$10$hLJbqslh/frc8Zp/.IyBv.tPItlpdjEmoEzEorlhDmLK8f1bHmI6K', '01684545118', 'rashik1@gmail.com', '23.7517979__90.4219168', 1, '2', 3, 'no', 'shopper', NULL, '', 'referred', NULL),
(6, 'Rashik Buksh', NULL, NULL, NULL, 'rbr', 'rafsan123', '01709305072', 'rbr@gmail.com', '730/5/1, Block-C, Khilgaon, Dhaka', NULL, NULL, NULL, NULL, 'customer', NULL, '', 'unreferred', NULL),
(11, 'buksh', NULL, NULL, NULL, NULL, 'buksh1234', NULL, 'buksh@gmail.com', '23.7517979__90.4219168', NULL, NULL, NULL, NULL, 'shopper', NULL, '', NULL, NULL),
(15, 'Rashik Buksh', NULL, NULL, NULL, NULL, 'rafsan123', '01684545112', 'rashikbuksh123@gmail.com', '23.7507983__90.4219536', NULL, NULL, NULL, NULL, 'shopper', NULL, '', NULL, NULL),
(16, 'anik', NULL, NULL, NULL, NULL, '$2b$10$XoJbPYObeFN.dhLLpniv.e6uZbfuORw0YhAaYAXnDvPlfgjpXWk02', NULL, 'anik@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'unreferred', NULL),
(17, 'Anik Store', NULL, NULL, NULL, NULL, '$2b$10$hLJbqslh/frc8Zp/.IyBv.tPItlpdjEmoEzEorlhDmLK8f1bHmI6K', '01684345120', 'anik123@gmail.com', '22.3303507__91.7867411', NULL, 'update', NULL, NULL, 'shopper', 1, '9ikaktaf3rp', 'referred', '1709745319457__60111.jpg'),
(18, 'RAFID BUKSH', NULL, NULL, NULL, NULL, '$2b$10$59OJMjepWmTnuNbiT5VR3uCK93oHNlBHmWm6GOlRNtsjkkkn7AXUK', NULL, 'rafid@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(19, 'RAFID BUKSH', NULL, NULL, NULL, NULL, '$2b$10$VeU3tFlgbCpCrsV2CQtMSupS9/JYqhBAMPWXEq7wEnBFj6iQWxZl6', NULL, 'rafid123@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'unreferred', NULL),
(20, 'Tag Store', NULL, NULL, NULL, NULL, '$2b$10$1R4tRAPwHpmV6EnGtAStUeJZY8aj0Dt9NR.B2fjgNiXSYkmH5rm46', NULL, 'tag@admin.com', '23.7517979__90.4219168', NULL, NULL, NULL, NULL, 'admin', 1, 'bo1ntlas7k7', 'unreferred', NULL),
(36, 'Rashik Buksh ', NULL, NULL, NULL, NULL, '$2b$10$sAtGIF2DZL.hB8LTMCQ7ZOp2Zdzln6WmbhK7pCrFhEKz46bH/6AF.', '01684545142', 'rashik@gmail.com', '22.3306189__91.7983311', NULL, 'k block haishahar chittagong asda', NULL, NULL, 'customer', NULL, '1mwoauien49', 'referred', '1699370631335__IMG_4137.JPG'),
(48, 'Rashik Buksh', NULL, NULL, NULL, NULL, '$2b$10$p.NA9WD2M7T/HFzL1kX.wee8biKelsaoe7qNWl/zXHfeHHG2GVErq', '01684545121', 'anik1234567@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, 'kmigen4lv1', NULL, NULL),
(52, 'Modarator', NULL, NULL, NULL, NULL, '$2b$10$KFdI.jfOFD5WbZhp.vHdTO6TJMunfxfEum7Hxza9rfnOpqxQxPsKq', '01888888888', 'modarator@tag.com', NULL, NULL, NULL, NULL, NULL, 'modarator', NULL, '', 'unreferred', NULL),
(58, 'Towhidul Islam', NULL, NULL, NULL, NULL, '$2b$10$v6O3JpuXQQ/Ga7wJK0yld.oykAFrwfK1YHsY29FUP16QWUfF0yRsS', '01878611610', 'towhidulislam221.bd@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '68ina65jck', 'referred', NULL),
(65, 'withrefer@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$RsqL5G2UjO8jpqxXayrSgOGXcDJHVGavAE6UkdBVFdG4chKIm6w2m', '01778601610', 'withrefer@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(66, 'withrefer2@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$rzmXcGfaANX0/3GZv0EjyeW8HywOOd4CCeqABvPJMMZ.A7BLGydLq', '01178601610', 'withrefer2@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(67, 'withrefer1@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$rtCitGWvGZn2HrHfN0ppsO5QwYPXdY8kO7TcSyOFvWoy1rt9BaRaq', '01875601610', 'withrefer1@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(68, 'refer1@gmail.com', NULL, NULL, NULL, NULL, '$2b$10$XMHkYt.EpOUKa22esem5qu7xgHq4J8vb74V7d8iFIDbsX3KszWmwG', '01838601610', 'refer1@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(70, 'noterefer@g.com', NULL, NULL, NULL, NULL, '$2b$10$6jELRlPUWVyEzE8begkq5euiBrlZYn4L/Of8Z.pPaf9tsm1MPfO7e', '01878631610', 'noterefer@g.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'unreferred', NULL),
(71, 'r1@g.com', NULL, NULL, NULL, NULL, '$2b$10$RguEkd4D9knGB2Wk37Wi/.HDm/q3.3OH..Vb1ntVQp.O4dlM621nC', '01878602612', 'r1@g.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, 'b47acyx1klp', 'referred', NULL),
(72, 'refbylink@g.com', NULL, NULL, NULL, NULL, '$2b$10$5RMgK8aUvxpztgEQkNMK...ohKcZKW0VE2N5Vjo3CSx1gbbmO3CMm', '01814032120', 'refbylink@g.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', 'referred', NULL),
(73, 'wrongref@p.com', NULL, NULL, NULL, NULL, '$2b$10$PwOatoHZsK3nquPMBnkK9uCbU1ungUWDOjGd5rKrXzYUq6C3ihJQq', '0187861161', 'wrongref@p.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, 'cw46k460k1m', 'referred', NULL),
(74, 'adasda', NULL, NULL, NULL, NULL, '$2b$10$j/EHcnuo7nTjIi84bJb5nuF4C3nmMMe2j9IdNaAT9WeNmFwVLlS7a', 'sdasd', 'asdasda@daasd', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(76, 'Towhidul Store', NULL, NULL, NULL, NULL, '$2b$10$BfsPyaAGL5wcR50.PNp51eHjBE6sohrTrqHUM59vrKdiUJftIzAZ6', '01601401607', 'towhidulislam2.bd@gmail.com', '22.3176576__91.7980074', NULL, NULL, NULL, NULL, 'shopper', NULL, '', 'unreferred', '1700676814695__channels4_profile.jpg'),
(92, 'RUNA LAYLA', NULL, NULL, NULL, NULL, '$2b$10$6BDsjaH9cTvjGZPl2mV6gubkrijR.KDQvSDKzGQVPMl/LR2/5CWoi', '01534559288', 'anayet.buksh@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(93, 'Rashik Buksh', NULL, NULL, NULL, NULL, '$2b$10$qAxS76NH/gWAWrXVLuUNoOpicrI.zNll97WEKaqyUmi67X4E3WI3q', '01709305071', 'rashikbuksh@gmail.com', NULL, NULL, NULL, NULL, NULL, 'customer', NULL, '', NULL, NULL),
(94, 'test shop', NULL, NULL, NULL, NULL, '$2b$10$f58g7rVQD6ePzEQOarhYYuyhKcRg0zhjecvVBuKqt6hKHlb.jhx8O', '01878601611', 'towhidulislam11.bd@gmail.com', '22.3305857__91.7971129', NULL, NULL, NULL, NULL, 'new_shopper', NULL, '', NULL, NULL),
(95, 'test shop ', NULL, NULL, NULL, NULL, '$2b$10$zTh8HtdgC5aPeGLq.p5VC.T6PtAo/.sE2XDxBgZ9oX1GJ47W8X4Za', '01648227285', 'towhidulislam11.bd@gmail.com', '22.3305857__91.7971129', NULL, NULL, NULL, NULL, 'shopper', 1, '', 'unreferred', NULL),
(98, 'Towhidul Islam', NULL, NULL, NULL, NULL, '$2b$10$zsJEl.HdAt3z4qMQKjh6Nu8ZVnCh/nNdYGstSKev.cJcISkJ4EvQq', '01878601610', 'towhidulislam2.bd@gmail.com', '', NULL, 'k block haishahar chittagong', NULL, NULL, 'customer', NULL, '', 'unreferred', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hero_slider`
--

CREATE TABLE `hero_slider` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `slider_position` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_slider`
--

INSERT INTO `hero_slider` (`id`, `title`, `subtitle`, `image`, `slider_position`) VALUES
(4, 'Sprite ', 'Cha Pata From Sylhet', '1693929901663__20230807_154229.jpg', 'top'),
(16, 'Promotion', 'eid-offer', '1711298519028__Handdrawn Circle Logo.jpg', 'top'),
(18, 'asas', 'test', '1712178860410__oma.jpg', 'bottom'),
(19, 'test', 'test', '1712178915741__Student Review.png', 'middle');

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
(72, 97, 17, '2024-01-30 21:29:36', '50', '', '', 2, 0, 0, 0, 'regular', 'Chilli Sauce TK 150.00', '1698677186176__BD-chili-Sauce--1kg.jpg'),
(73, 98, 17, '2024-01-30 21:29:36', '20', '', '', 3, 4, 0, 0, 'regular', ' Sprite (20 Fl Oz Bottle) varified TK 70.00', '1697265581988__sprite1.jpg'),
(74, 99, 17, '2024-01-30 21:29:36', '50', '', '', 1, 3, 0, 0, 'regular', ' Sprite (20 Fl Oz Bottle) TK 150.00', '1697265535780__sprite1.jpg'),
(75, 91, 17, '2024-01-30 21:30:18', '91', '', '', 1, 0, 0, 0, 'regular', 'Mango Pickle TK 100.00', '1703680620299__download.jpeg'),
(76, 90, 17, '2024-01-30 21:31:01', '40', '', '', 1, 3, 0, 0, 'regular', 'Pran Olive Pickle TK 95.00', '1703680891922__pran-olive-pickle-400-gm.jpeg'),
(77, NULL, 20, '2024-02-08T16:59:17.471Z', NULL, NULL, NULL, 0, 0, 0, 0, 'regular', 'hi', ''),
(78, 111, 95, '2024-03-16 22:20:58', '30', '', '', 1, 0, 0, 0, 'regular', 'Photato chips TK 68.00', '1696949827009__1678540367603.jpg'),
(79, NULL, 20, '2024-03-16T16:40:41.881Z', NULL, NULL, NULL, 1, 2, 0, 0, 'regular', 'hi', '1710607241318___DSC7956.JPG');

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
(72, 76, 36, 'cool', '4/20/2024, 7:43:29 PM'),
(73, 74, 20, 'Interested', '4/22/2024, 11:31:55 PM'),
(74, 76, 20, 'Interested', '2024-04-22 23:43:57'),
(75, 76, 20, 'Cool', '2024-04-22 23:48:25'),
(76, 73, 20, 'Interested', '2024-04-22 23:55:34'),
(77, 73, 20, 'Not Interested', '2024-04-22 23:56:27'),
(78, 73, 20, 'Interested', '2024-04-22 23:56:29'),
(79, 73, 20, 'Nice', '2024-04-22 23:56:32'),
(80, 74, 20, 'Not Interested', '2024-04-23 00:09:56'),
(81, 74, 20, 'Excellent', '2024-04-23 00:10:01'),
(82, 79, 36, 'efrdsf', '2024-05-11 22:02:38'),
(83, 79, 36, 'Excellent', '2024-05-21 00:04:49');

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
(74, 75, 17),
(75, 73, 17),
(76, 72, 17),
(77, 76, 36),
(78, 75, 36),
(79, 72, 36),
(80, 73, 36),
(81, 74, 36),
(83, 73, 20),
(84, 79, 36),
(85, 78, 36);

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
(1, 'Not asdasdasdsd', '12-12-12', 3, 3, 0),
(2, 'You have a new order. Order Number is #29.', '2023-10-12 19:40:12', 3, 17, 0),
(3, 'You have a new order. Order Number is #30.', '2023-10-13 16:59:57', 17, 16, 0),
(4, 'You have a new order. Order Number is #31.', '2023-10-14 15:15:21', 17, 36, 0),
(5, 'You have a new order. Order Number is #32.', '2023-10-14 16:53:10', 17, 36, 0),
(6, 'You have a new order. Order Number is #33.', '2023-10-16 17:55:50', 11, 36, 0),
(7, 'You have a new order. Order Number is #34.', '2023-10-17 14:41:59', 17, 73, 0),
(8, 'You have a new order. Order Number is #35.', '2023-10-21 15:39:18', 11, 36, 0),
(9, 'You have a new order. Order Number is #36.', '2023-10-21 15:40:26', 17, 36, 0),
(10, 'You have a new order. Order Number is #37.', '2023-10-21 16:27:45', 17, 36, 0),
(11, 'You have a new order. Order Number is #38.', '2023-10-21 16:27:45', 17, 36, 0),
(12, 'You have a new order. Order Number is #39.', '2023-10-21 17:14:12', 11, 36, 0),
(13, 'You have a new order. Order Number is #40.', '2023-10-27 15:38:32', 11, 36, 0),
(14, 'You have a new order. Order Number is #41.', '2023-11-04 19:13:17', 17, 36, 0),
(15, 'You have a new order. Order Number is #42.', '2023-11-04 19:56:50', 11, 36, 0),
(16, 'You have a new order. Order Number is #43.', '2023-11-04 19:59:34', 17, 36, 0),
(17, 'You have a new order. Order Number is #44.', '2023-11-04 20:01:00', 17, 36, 0),
(18, 'You have a new order. Order Number is #45.', '2023-11-08 14:03:48', 3, 36, 0),
(19, 'You have a new order. Order Number is #46.', '2023-11-08 17:27:52', 17, 36, 0),
(20, 'You have a new order. Order Number is #47.', '2023-11-08 17:48:48', 17, 36, 0),
(21, 'You have a new order. Order Number is #48.', '2023-11-08 17:55:37', 3, 36, 0),
(22, 'You have a new order. Order Number is #49.', '2023-11-09 15:51:12', 17, 36, 0),
(23, 'You have a new order. Order Number is #50.', '2023-11-09 18:06:45', 17, 36, 0),
(24, 'You have a new order. Order Number is #51.', '2023-11-09 18:07:52', 17, 36, 0),
(25, 'You have a new order. Order Number is #52.', '2023-11-16 15:51:08', 17, 36, 0),
(26, 'You have a new order. Order Number is #53.', '2023-11-16 15:52:18', 11, 36, 0),
(27, 'You have a new order. Order Number is #54.', '2023-11-18 07:04:21', 11, 36, 0),
(28, 'You have a new order. Order Number is #55.', '2023-11-18 07:06:44', 17, 36, 0),
(29, 'You have a new order. Order Number is #56.', '2023-11-18 09:09:39', 11, 36, 0),
(30, 'You have a new order. Order Number is #57.', '2023-11-18 09:14:02', 17, 36, 0),
(31, 'You have a new order. Order Number is #58.', '2023-11-18 09:23:24', 17, 36, 0),
(32, 'You have a new order. Order Number is #59.', '2023-11-18 09:49:24', 17, 36, 0),
(33, 'You have a new order. Order Number is #60.', '2023-11-18 09:52:12', 17, 36, 0),
(34, 'You have a new order. Order Number is #61.', '2023-11-18 10:08:44', 17, 36, 0),
(35, 'You have a new order. Order Number is #62.', '2023-11-20 12:56:20', 17, 36, 0),
(36, 'You have a new order. Order Number is #63.', '2023-11-20 12:57:08', 3, 36, 0),
(37, 'You have a new order. Order Number is #64.', '2023-11-20 14:01:32', 11, 36, 0),
(38, 'You have a new order. Order Number is #65.', '2023-11-20 14:01:41', 17, 36, 0),
(39, 'You have a new order. Order Number is #66.', '2023-11-20 16:01:23', 3, 36, 0),
(40, 'You have a new order. Order Number is #67.', '2023-11-20 16:02:27', 11, 36, 0),
(41, 'You have a new order. Order Number is #68.', '2023-11-20 16:06:03', 17, 36, 0),
(42, 'You have a new order. Order Number is #69.', '2023-11-20 16:30:43', 3, 36, 0),
(43, 'You have a new order. Order Number is #70.', '2023-11-22 18:31:14', 3, 36, 0),
(44, 'You have a new order. Order Number is #71.', '2023-11-24 18:20:35', 11, 36, 0),
(45, 'You have a new order. Order Number is #72.', '2023-11-24 18:21:10', 17, 36, 0),
(46, 'You have a new order. Order Number is #73.', '2023-11-26 16:41:11', 17, 36, 0),
(47, 'You have a new order. Order Number is #74.', '2023-11-28 13:21:57', 17, 36, 0),
(48, 'You have a new order. Order Number is #75.', '2023-11-28 13:26:15', 17, 36, 0),
(49, 'You have a new order. Order Number is #76.', '2023-11-28 13:37:03', 17, 36, 0),
(50, 'You have a new order. Order Number is #77.', '2023-12-06 00:16:26', 17, 16, 0),
(51, 'You have a new order. Order Number is #78.', '2023-12-27 20:35:37', 17, 36, 0),
(52, 'You have a new order. Order Number is #79.', '2023-12-29 19:51:26', 17, 36, 0),
(53, 'You have a new order. Order Number is #80.', '2023-12-31 16:31:53', 17, 36, 0),
(54, 'You have a new comment in your post. commented by anik', '2023-12-31 23:21:10', 16, 17, 0),
(55, 'anik liked your post', '2023-12-31 23:49:59', 16, 17, 0),
(56, 'You have a new order. Order Number is #87.', '2024-01-05 00:37:55', 17, 16, 0),
(57, 'You have a new order. Order Number is #92.', '2024-01-05 00:39:52', 17, 16, 0),
(58, 'You have a new order. Order Number is #93.', '2024-01-07 21:07:44', 17, 16, 0),
(59, 'You have a new order. Order Number is #94.', '2024-01-07 21:08:42', 17, 16, 0),
(60, 'You have a new order. Order Number is #95.', '2024-01-22 21:14:33', 17, 36, 0),
(61, 'You have a new order. Order Number is #96.', '2024-01-25 12:35:54', 17, 36, 0),
(62, 'You have a new order. Order Number is #97.', '2024-01-25 15:30:51', 17, 36, 0),
(69, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:29:44', 73, 36, 1),
(70, 'Rashik Buksh liked your post', '2024-01-28 21:29:50', 17, 36, 0),
(71, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:29:53', 17, 36, 0),
(72, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:29:55', 17, 36, 0),
(73, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:29:58', 17, 36, 0),
(74, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:30:15', 17, 36, 0),
(75, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:30:16', 17, 36, 0),
(76, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:30:18', 17, 36, 0),
(77, 'You have a new comment in your post. commented by Rashik Buksh', '2024-01-28 21:30:19', 17, 36, 0),
(78, 'Anik Store accept your order', '2024-01-28 22:02:12', 36, 17, 0),
(79, 'Anik Store accept your order', '2024-01-28 22:04:36', 36, 17, 0),
(80, 'Completed your order Succesfully #97', '2024-01-28 23:20:17', 36, 17, 0),
(81, 'You have a new order. Order Number is #98.', '2024-01-30 21:32:20', 17, 36, 0),
(82, 'Anik Store accept your order. collect your products in 45 min.', '2024-01-30 21:33:19', 36, 17, 0),
(83, 'You have a new order. Order Number is #99.', '2024-01-30 21:35:30', 17, 36, 0),
(84, 'You have a new order. Order Number is #100.', '2024-01-30 21:38:36', 17, 36, 0),
(85, 'You have a new order. Order Number is #101.', '2024-01-30 22:00:13', 17, 36, 0),
(86, 'You have a new order. Order Number is #102.', '2024-01-30 22:04:51', 17, 36, 0),
(87, 'You have a new order. Order Number is #103.', '2024-01-30 22:09:46', 17, 36, 0),
(88, 'You have a new order. Order Number is #104.', '2024-01-30 22:10:03', 17, 36, 0),
(89, 'You have a new order. Order Number is #105.', '2024-02-15 20:52:31', 17, 36, 0),
(90, 'Anik Store liked your post', '2024-03-04 23:44:33', 17, 17, 0),
(91, 'You have a new order. Order Number is #106.', '2024-03-06 19:09:59', 17, 36, 0),
(92, 'Rashik Buksh liked your post', '2024-03-06 19:28:20', 17, 36, 0),
(93, 'Rashik Buksh liked your post', '2024-03-06 19:28:23', 17, 36, 0),
(94, 'Rashik Buksh liked your post', '2024-03-06 19:28:25', 17, 36, 0),
(95, 'Rashik Buksh liked your post', '2024-03-06 19:28:26', 17, 36, 0),
(96, 'Rashik Buksh liked your post', '2024-03-06 19:28:27', 17, 36, 0),
(97, 'Rashik Buksh liked your post', '2024-03-06 19:28:30', 17, 36, 0),
(98, 'You have a new order. Order Number is #107.', '2024-03-06 19:29:04', 17, 36, 0),
(99, 'You have a new order. Order Number is #108.', '2024-03-06 19:29:48', 17, 36, 0),
(100, 'You have a new order. Order Number is #109.', '2024-03-06 19:36:13', 17, 36, 0),
(101, 'Anik Store accept your order. collect your products in 45 min.', '2024-03-06 19:36:26', 36, 17, 0),
(102, 'You have a new order. Order Number is #110.', '2024-03-06 19:42:35', 17, 36, 0),
(103, 'Anik Store accept your order. collect your products within 8:42 PM.', '2024-03-06 19:42:55', 36, 17, 0),
(104, 'You have a new order. Order Number is #111.', '2024-03-06 19:47:04', 17, 36, 0),
(105, 'You have a new order. Order Number is #112.', '2024-03-06 19:47:41', 17, 36, 0),
(106, 'You have a new order. Order Number is #113.', '2024-03-06 19:50:35', 17, 36, 0),
(107, 'You have a new order. Order Number is #114.', '2024-03-06 19:56:09', 17, 36, 0),
(108, 'You have a new order. Order Number is #115.', '2024-03-06 20:27:03', 17, 36, 0),
(109, 'Anik Store accept your order. collect your products within 9:27 PM.', '2024-03-06 20:38:34', 36, 17, 0),
(110, 'Completed your order Succesfully #115', '2024-03-06 20:39:03', 36, 17, 0),
(111, 'Anik Store accept your order. collect your products within 8:56 PM.', '2024-03-06 20:40:33', 36, 17, 0),
(112, 'Completed your order Succesfully #114', '2024-03-06 20:41:29', 36, 17, 0),
(113, 'Anik Store accept your order. collect your products within 8:47 PM.', '2024-03-06 20:43:43', 36, 17, 0),
(114, 'Anik Store accept your order. collect your products within 8:47 PM.', '2024-03-06 20:44:23', 36, 17, 0),
(115, 'You have a new order. Order Number is #116.', '2024-03-06 20:48:55', 17, 36, 0),
(116, 'Anik Store accept your order. collect your products within 9:48 PM.', '2024-03-06 20:49:08', 36, 17, 0),
(117, 'Completed your order Succesfully #116', '2024-03-06 20:49:24', 36, 17, 0),
(118, 'You have a new order. Order Number is #117.', '2024-03-06 22:01:32', 20, 36, 0),
(119, 'Tag Store accept your order. collect your products within 11:01 PM.', '2024-03-06 22:01:48', 36, 20, 0),
(120, 'Completed your order Succesfully #117', '2024-03-06 22:01:51', 36, 20, 0),
(121, 'You have a new order. Order Number is #118.', '2024-03-12 23:34:04', 17, 36, 0),
(122, 'You have a new order. Order Number is #119.', '2024-03-12 23:34:58', 17, 36, 0),
(123, 'You have a new order. Order Number is #120.', '2024-03-12 23:40:19', 17, 36, 0),
(124, 'You have a new order. Order Number is #121.', '2024-03-16 22:27:27', 95, 36, 1),
(125, 'test shop  accept your order. collect your products within 11:27 PM.', '2024-03-16 22:29:08', 36, 95, 0),
(126, 'Completed your order Succesfully #121', '2024-03-16 22:31:02', 36, 95, 0),
(127, 'You have a new order. Order Number is #122.', '2024-03-25 22:01:27', 17, 36, 1),
(128, 'You have a new order. Order Number is #123.', '2024-03-25 22:07:28', 95, 36, 1),
(129, 'You have a new order. Order Number is #124.', '2024-03-25 22:25:21', 17, 36, 0),
(130, 'You have a new order. Order Number is #125.', '2024-03-25 23:21:09', 17, 36, 1),
(131, 'You have a new order. Order Number is #126.', '2024-03-25 23:29:08', 17, 36, 1),
(132, 'You have a new order. Order Number is #127.', '2024-03-25 23:34:17', 17, 36, 1),
(133, 'Anik Store accept your order. collect your products within 12:34 AM.', '2024-03-25 23:35:14', 36, 17, 0),
(134, 'Completed your order Succesfully #127', '2024-03-25 23:35:16', 36, 17, 0),
(135, 'You have a new order. Order Number is #128.', '2024-03-26 00:49:30', 20, 36, 1),
(136, 'You have a new order. Order Number is #129.', '2024-03-26 01:04:13', 17, 36, 1),
(137, 'You have a new order. Order Number is #130.', '2024-03-26 01:05:17', 20, 36, 1),
(138, 'You have a new order. Order Number is #131.', '2024-03-26 01:06:34', 17, 36, 1),
(139, 'You have a new order. Order Number is #132.', '2024-03-26 01:08:24', 20, 36, 1),
(140, 'You have a new order. Order Number is #133.', '2024-04-04 15:23:11', 17, 36, 1),
(141, 'Anik Store accept your order. collect your products within 4:23 PM.', '2024-04-04 15:26:19', 36, 17, 0),
(142, 'You have a new comment in your post. commented by Rashik Buksh ', '2024-04-20 19:43:29', 17, 36, 1),
(143, 'You have a new order. Order Number is #134.', '2024-04-22 20:42:15', 17, 36, 1),
(144, 'You have a new order. Order Number is #135.', '2024-04-22 20:42:24', 17, 36, 1),
(145, 'You have a new order. Order Number is #136.', '2024-04-22 20:44:06', 17, 36, 0),
(146, 'You have a new order. Order Number is #137.', '2024-04-22 20:49:04', 17, 36, 0),
(147, 'You have a new order. Order Number is #138.', '2024-04-22 20:49:19', 20, 36, 1),
(148, 'You have a new order. Order Number is #139.', '2024-04-22 20:49:38', 17, 36, 0),
(149, 'You have a new order. Order Number is #140.', '2024-04-22 20:50:21', 17, 36, 0),
(150, 'You have a new order. Order Number is #141.', '2024-04-22 20:55:51', 17, 36, 0),
(151, 'Anik Store accept your order. collect your products within 9:55 PM.', '2024-04-22 22:21:01', 36, 17, 0),
(152, 'Completed your order Successfully #141', '2024-04-22 22:21:13', 36, 17, 0),
(153, 'You have a new comment in your post. Commented by Tag Store', '2024-04-22 23:31:55', 17, 20, 1),
(154, 'You have a new comment in your post. Commented by Tag Store', '2024-04-22 23:43:57', 17, 20, 1),
(155, 'You have a new comment in your post. Commented by Tag Store', '2024-04-22 23:48:25', 17, 20, 1),
(156, 'You have a new comment in your post. Commented by Tag Store', '2024-04-22 23:55:34', 17, 20, 1),
(157, 'You have a new comment in your post. Commented by Tag Store', '2024-04-22 23:56:27', 17, 20, 1),
(158, 'You have a new comment in your post. Commented by Tag Store', '2024-04-22 23:56:29', 17, 20, 1),
(159, 'You have a new comment in your post. Commented by Tag Store', '2024-04-22 23:56:32', 17, 20, 1),
(160, 'Tag Store liked your post', '2024-04-22 23:56:35', 17, 20, 0),
(161, 'You have a new comment in your post. Commented by Tag Store', '2024-04-23 00:09:56', 17, 20, 1),
(162, 'You have a new comment in your post. Commented by Tag Store', '2024-04-23 00:10:01', 17, 20, 1),
(163, 'You have a new order. Order Number is #142.', '2024-04-23 00:23:28', 17, 36, 1),
(164, 'You have a new order. Order Number is #143.', '2024-04-23 00:32:17', 17, 36, 1),
(165, 'Anik Store accept your order. collect your products within 9:49 PM.', '2024-04-24 15:23:11', 36, 17, 0),
(166, 'Completed your order Successfully #137', '2024-04-24 15:23:15', 36, 17, 0),
(167, 'You have a new order. Order Number is #144.', '2024-04-28 23:52:40', 17, 36, 0),
(168, 'You have a new comment in your post. Commented by Rashik Buksh ', '2024-05-11 22:02:38', 20, 36, 1),
(169, 'You have a new comment in your post. Commented by Rashik Buksh ', '2024-05-21 00:04:49', 20, 36, 1),
(170, 'Rashik Buksh  liked your post', '2024-05-21 00:04:51', 20, 36, 0),
(171, 'Rashik Buksh  liked your post', '2024-05-21 00:05:00', 95, 36, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ordered_product`
--

CREATE TABLE `ordered_product` (
  `id` int(11) NOT NULL,
  `order_uuid` varchar(255) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `discount` decimal(20,3) NOT NULL,
  `quantity` decimal(20,3) NOT NULL,
  `price` decimal(20,3) NOT NULL,
  `weight` decimal(20,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordered_product`
--

INSERT INTO `ordered_product` (`id`, `order_uuid`, `order_id`, `product_id`, `discount`, `quantity`, `price`, `weight`) VALUES
(107, '', 133, 91, 91.000, 1.000, 191.000, 0.000),
(108, '', 133, 93, 3.000, 1.000, 60.000, 0.000),
(109, '', 133, 89, 15.000, 2.000, 100.000, 0.000),
(110, '', 133, 90, 40.000, 1.000, 135.000, 0.000),
(111, '', 134, 89, 15.000, 1.000, 100.000, 0.000),
(112, '', 134, 94, 0.000, 1.000, 90.000, 0.000),
(113, '', 134, 90, 40.000, 2.000, 135.000, 0.000),
(114, '', 134, 91, 91.000, 5.000, 191.000, 0.000),
(115, '', 134, 93, 3.000, 1.000, 60.000, 0.000),
(116, '', 135, 89, 15.000, 1.000, 100.000, 0.000),
(117, '', 135, 93, 3.000, 1.000, 60.000, 0.000),
(118, '', 135, 90, 40.000, 2.000, 135.000, 0.000),
(119, '', 135, 91, 91.000, 5.000, 191.000, 0.000),
(120, '', 135, 94, 0.000, 1.000, 90.000, 0.000),
(121, '', 136, 89, 15.000, 1.000, 100.000, 0.000),
(122, '', 136, 90, 40.000, 2.000, 135.000, 0.000),
(123, '', 136, 91, 91.000, 5.000, 191.000, 0.000),
(124, '', 136, 93, 3.000, 1.000, 60.000, 0.000),
(125, '', 136, 94, 0.000, 1.000, 90.000, 0.000),
(126, '', 137, 89, 15.000, 1.000, 100.000, 0.000),
(127, '', 137, 94, 0.000, 1.000, 90.000, 0.000),
(128, '', 137, 90, 40.000, 2.000, 135.000, 0.000),
(129, '', 137, 91, 91.000, 5.000, 191.000, 0.000),
(130, '', 137, 93, 3.000, 1.000, 60.000, 0.000),
(131, '', 138, 110, 0.000, 3.000, 191.000, 0.000),
(132, '', 138, 115, 0.000, 1.000, 35.000, 0.000),
(133, '', 138, 101, 10.000, 1.000, 100.000, 0.000),
(134, '', 139, 89, 15.000, 1.000, 100.000, 0.000),
(135, '', 139, 90, 40.000, 1.000, 135.000, 0.000),
(136, '', 140, 89, 15.000, 1.000, 100.000, 0.000),
(137, '', 140, 91, 91.000, 1.000, 191.000, 0.000),
(138, '', 140, 93, 3.000, 1.000, 60.000, 0.000),
(139, '', 140, 90, 40.000, 1.000, 135.000, 0.000),
(140, '', 141, 89, 15.000, 1.000, 100.000, 0.000),
(141, '', 141, 90, 40.000, 1.000, 135.000, 0.000),
(142, '', 142, 93, 3.000, 2.000, 60.000, 0.000),
(143, '', 142, 94, 0.000, 2.000, 90.000, 0.000),
(144, '', 143, 93, 3.000, 1.000, 60.000, 0.000),
(145, '', 143, 94, 0.000, 1.000, 90.000, 0.000),
(146, '', 144, 90, 40.000, 1.000, 135.000, 0.000),
(147, '', 144, 93, 3.000, 1.000, 60.000, 0.000),
(148, '', 144, 91, 91.000, 2.000, 191.000, 0.000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `title` longtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `optionalImage1` text NOT NULL,
  `optionalImage2` text NOT NULL,
  `short_description` varchar(100) DEFAULT NULL,
  `full_description` varchar(255) DEFAULT NULL,
  `keywords` longtext NOT NULL,
  `category_id` int(11) NOT NULL,
  `isVerified` varchar(15) DEFAULT NULL,
  `price` decimal(20,3) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `sku`, `name`, `title`, `image`, `optionalImage1`, `optionalImage2`, `short_description`, `full_description`, `keywords`, `category_id`, `isVerified`, `price`, `quantity`) VALUES
(12, NULL, 'Vanity Bag', 'Vanity_Bag', '1690478518635__Welcome Scan.jpg', '', '', 'Bag', 'Bag', '', 14, NULL, NULL, NULL),
(13, NULL, 'sugar update', 'sugar_update', '1711967867828__sugar.jpg', '', '', '10', '10', '', 1, NULL, NULL, NULL),
(14, NULL, 'Ishan Tea ', 'Ishan_Tea_', '1693931993449__20230807_154229.jpg', '', '', 'Cha pata', 'Cha pata From Sylhet ', '', 16, 'verified', 90.000, NULL),
(15, NULL, 'Hand bag In Town', 'Hand_bag_In_Town', '1696949606356__bag.png', '', '', 'This is a hand bag , ', 'This is a benity bag , and this is fopr women', '', 14, NULL, NULL, NULL),
(16, NULL, 'Yellow Rice', 'Yellow_Rice', '1696949688320__milled-rice-bowl-wooden-spoon-black-cement-floor.jpg', '', '', 'RIce Desc updated by Towhid', 'Rice in Bangladesh Rice is the staple food of about 135 million people of Bangladesh. It provides nearly 48% of rural employment, about two-third of total calorie supply and about one-half of the total protein intake of an average person in the country. R', '', 12, 'verified', 98.000, NULL),
(17, NULL, 'Photato chips', 'Photato_chips', '1696949827009__1678540367603.jpg', '', '', 'asdfasd', 'asdvgasdvasdfvgasdv', '', 2, 'verified', 98.000, NULL),
(18, NULL, '7 up Normal', '7_up_Normal', '1696951856422__7upimage.jpg', '1711793616349__bangladesh-3673378_640.jpg', '1711793716715__close-up-hand-holding-light-bulb-with-plant_23-2148785049.jpg', 'This is 7 up', 'This is 7 up', '', 2, 'notVerified', NULL, NULL),
(19, NULL, '7 up Verified', '7_up_Verified', '1696951925428__photo-1622766815178-641bef2b4630.jpg', '', '', '7 up Verified', '7 up Verified', '', 2, 'verified', 90.000, NULL),
(42, NULL, ' Sprite (20 Fl Oz Bottle)', '_Sprite_(20_Fl_Oz_Bottle)', '1697265535780__sprite1.jpg', '', '', ' Sprite (20 Fl Oz Bottle)', ' Sprite (20 Fl Oz Bottle)', '', 2, 'notVerified', 0.000, 0),
(43, NULL, ' Sprite (20 Fl Oz Bottle) varified', '_Sprite_(20_Fl_Oz_Bottle)_varified', '1697265581988__sprite1.jpg', '', '', ' Sprite (20 Fl Oz Bottle)', ' Sprite (20 Fl Oz Bottle)', '', 2, 'verified', 90.000, 43),
(44, NULL, 'Coke Cola Original', 'Coke_Cola_Original_in_chittagong', NULL, '1711795405755__hand-pointing-midnight-alarm-clock-rings-generated-by-ai_188544-26776.jpg', '', 'Coca-Cola Classic strikes the perfect balance between sweetness and acidity, resulting in a harmonio', 'Coca-Cola Classic strikes the perfect balance between sweetness and acidity, resulting in a harmonious blend that is simply irresistible. The careful combination of ingredients ensures that every sip delivers a satisfying and well-rounded flavour. This ic', '', 2, 'notVerified', 0.000, 0),
(45, NULL, 'Chilli Sauce', 'Chilli_Sauce', '1698677186176__BD-chili-Sauce--1kg.jpg', '', '', 'Chilli sauce, also commonly spelled as \"chili sauce\" or \"hot sauce,\" is a condiment made from chili ', 'Chili sauce can be used as a condiment, marinade, or ingredient in cooking to add heat and flavor to dishes such as tacos, burgers, stir-fries, and more. When choosing a chili sauce, consider your heat tolerance, as well as the specific flavor profile you', '', 17, 'notVerified', 0.000, 0),
(47, NULL, 'Mango Pickle', 'Mango_Pickle', '1703680620299__download.jpeg', '', '', 'Mango pickle is a popular condiment in many cuisines, particularly in South Asia. ', 'Mango pickle is a popular condiment in many cuisines, particularly in South Asia. It\'s made by preserving raw mangoes in a mixture of various spices, oil, and sometimes vinegar. The preparation methods and spice mixtures can vary widely based on regional ', '', 2, 'notVerified', 191.000, 59),
(48, NULL, 'Pran Olive Pickle', 'Pran_Olive_Pickle_TagThinkAndget', '1703680891922__pran-olive-pickle-400-gm.jpeg', '', '', 'Pran Olive Pickle', 'Pran Olive Pickle', '', 2, 'verified', 135.000, 100),
(49, NULL, 'Pran Olive Pickle n-v', 'Pran_Olive_Pickle_n-v', '1703680913920__pran-olive-pickle-400-gm.jpeg', '', '', 'Pran Olive Pickle', 'Pran Olive Pickle', '', 2, 'notVerified', 0.000, 0),
(70, NULL, 'Pran-Sauce-750-gm', 'Pran-Sauce-750-gm', '1711794630854__1.jpg', '', '', 'Coca-Cola Classic strikes the perfect balance between sweetness and acidity, resulting in a harmonio', '<p><span style=\"color: rgb(13, 13, 13);\">With the </span><code style=\"color: rgb(13, 13, 13);\">dangerouslySetInnerHTML</code><span style=\"color: rgb(13, 13, 13);\"> attribute, you can render HTML content within the </span><code style=\"color: rgb(13, 13, 13', 'Coca-Cola Classic,perfect balance, test', 1, 'notVerified', 35.000, 60);

-- --------------------------------------------------------

--
-- Table structure for table `product_order`
--

CREATE TABLE `product_order` (
  `id` int(11) NOT NULL,
  `order_uuid` varchar(20) NOT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `customer_profile_id` int(11) NOT NULL,
  `shopper_id` int(11) NOT NULL,
  `price` decimal(20,3) NOT NULL,
  `customers_address_details_id` int(11) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `cancel_report` text DEFAULT NULL,
  `order_time` datetime NOT NULL,
  `shopper_order_accept_time` datetime DEFAULT NULL,
  `delivery_time` datetime DEFAULT NULL,
  `order_delay_report` varchar(25) DEFAULT NULL,
  `customers_address_summary` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_order`
--

INSERT INTO `product_order` (`id`, `order_uuid`, `order_status`, `customer_profile_id`, `shopper_id`, `price`, `customers_address_details_id`, `payment_type`, `cancel_report`, `order_time`, `shopper_order_accept_time`, `delivery_time`, `order_delay_report`, `customers_address_summary`) VALUES
(133, '', 'accepted', 36, 17, 422.000, 0, 'Cash On Pickup', NULL, '2024-04-04 15:23:10', '2024-04-04 15:26:19', NULL, NULL, 'Pick up'),
(134, '', 'pending', 36, 17, 922.000, 0, 'Cash On Pickup', NULL, '2024-04-22 20:42:15', NULL, NULL, NULL, 'Pick up'),
(135, '', 'pending', 36, 17, 922.000, 0, 'Cash On Pickup', NULL, '2024-04-22 20:42:24', NULL, NULL, NULL, 'Pick up'),
(136, '', 'pending', 36, 17, 922.000, 0, 'Cash On Pickup', NULL, '2024-04-22 20:44:06', NULL, NULL, NULL, 'Pick up'),
(137, '', 'completed', 36, 17, 922.000, 0, 'Cash On Pickup', NULL, '2024-04-22 20:49:04', '2024-04-24 15:23:11', '2024-04-24 15:23:15', NULL, 'Pick up'),
(138, '', 'pending', 36, 20, 698.000, 11, 'Cash On Delivery', NULL, '2024-04-22 20:49:19', NULL, NULL, NULL, 'Home,k block haishahar chittagong,01878601610'),
(139, '', 'pending', 36, 17, 180.000, 0, 'Cash On Pickup', NULL, '2024-04-22 20:49:38', NULL, NULL, NULL, 'Pick up'),
(140, '', 'pending', 36, 17, 337.000, 0, 'Cash On Pickup', NULL, '2024-04-22 20:50:21', NULL, NULL, NULL, 'Pick up'),
(141, '', 'completed', 36, 17, 180.000, 0, 'Cash On Pickup', NULL, '2024-04-22 20:55:51', '2024-04-22 22:21:01', '2024-04-22 22:21:13', NULL, 'Pick up'),
(142, '', 'pending', 36, 17, 294.000, 0, 'Cash On Pickup', NULL, '2024-04-23 00:23:28', NULL, NULL, NULL, 'Pick up'),
(143, '', 'pending', 36, 17, 147.000, 0, 'Cash On Pickup', NULL, '2024-04-23 00:32:17', NULL, NULL, NULL, 'Pick up'),
(144, '', 'pending', 36, 17, 352.000, 0, 'Cash On Pickup', NULL, '2024-04-28 23:52:40', NULL, NULL, NULL, 'Pick up');

-- --------------------------------------------------------

--
-- Table structure for table `refer`
--

CREATE TABLE `refer` (
  `id` int(11) NOT NULL,
  `referred_by` int(11) NOT NULL,
  `referred_to` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refer`
--

INSERT INTO `refer` (`id`, `referred_by`, `referred_to`) VALUES
(3, 48, 17),
(8, 48, 36),
(10, 48, 49),
(11, 17, 58),
(12, 58, 20),
(13, 48, 61),
(14, 48, 61),
(15, 48, 61),
(16, 48, 61),
(17, 58, 65),
(18, 58, 66),
(19, 58, 67),
(20, 58, 68),
(21, 58, 71),
(22, 71, 72),
(23, 58, 73);

-- --------------------------------------------------------

--
-- Table structure for table `requested_product_stock`
--

CREATE TABLE `requested_product_stock` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `shopper_id` int(11) NOT NULL,
  `shopper_product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_product_stock`
--

INSERT INTO `requested_product_stock` (`id`, `date`, `user_id`, `shopper_id`, `shopper_product_id`) VALUES
(10, '2024-05-21', 36, 17, 116),
(11, '2024-05-21', 36, 17, 116),
(12, '2024-05-21', 36, 17, 116),
(13, '2024-05-21', 36, 17, 116),
(14, '2024-05-21', 36, 17, 116),
(15, '2024-05-21', 36, 17, 116),
(16, '2024-05-21', 36, 17, 116);

-- --------------------------------------------------------

--
-- Table structure for table `shopper_follower`
--

CREATE TABLE `shopper_follower` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) DEFAULT NULL,
  `shopper_id` int(11) DEFAULT NULL,
  `follow_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopper_follower`
--

INSERT INTO `shopper_follower` (`id`, `follower_id`, `shopper_id`, `follow_date`) VALUES
(12, 36, 95, '2024-04-29'),
(13, 36, 15, '2024-04-29'),
(14, 36, 76, '2024-04-29'),
(15, 17, 76, '2024-04-29'),
(16, 36, 3, '2024-05-02');

-- --------------------------------------------------------

--
-- Table structure for table `shopper_product`
--

CREATE TABLE `shopper_product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(20,3) NOT NULL,
  `discount` decimal(20,3) NOT NULL,
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
(89, 'Pran Olive Pickle n-v', 100.000, 15.000, 94, 0, 0, 0, 49, 17, 21),
(90, 'Pran Olive Pickle', 135.000, 40.000, 94, 0, 0, 0, 48, 17, 15),
(91, 'Mango Pickle', 191.000, 91.000, 53, 0, 0, 0, 47, 17, 21),
(93, 'Chilli Sauce', 60.000, 3.000, 107, 0, 0, 0, 45, 17, 3),
(94, ' Sprite (20 Fl Oz Bottle) varified', 90.000, 0.000, 42, 0, 0, 0, 43, 17, 4),
(95, 'Coke Cola Original', 700.000, 680.000, 100, 0, 0, 0, 44, 17, 5),
(96, ' Sprite (20 Fl Oz Bottle)', 400.000, 350.000, 100, 0, 0, 0, 42, 17, 0),
(97, 'Chilli Sauce', 200.000, 50.000, 100, 0, 0, 0, 45, 17, 1),
(98, ' Sprite (20 Fl Oz Bottle) varified', 90.000, 20.000, 43, 0, 0, 0, 43, 17, 3),
(99, ' Sprite (20 Fl Oz Bottle)', 200.000, 50.000, 100, 0, 0, 0, 42, 17, 2),
(101, 'Hand bag In Town', 100.000, 10.000, 6, 0, 0, 0, 15, 20, 2),
(103, 'Yellow Rice', 98.000, 8.000, 67, 0, 0, 0, 16, 20, 2),
(104, 'Ishan Tea ', 90.000, 10.000, 100, 0, 0, 0, 14, 20, 4),
(105, 'Photato chips', 98.000, 0.000, 0, 0, 0, 0, 17, 20, 0),
(106, ' Sprite (20 Fl Oz Bottle) varified', 90.000, 0.000, 43, 0, 0, 0, 43, 20, 1),
(109, 'Pran Olive Pickle', 135.000, 0.000, 99, 0, 0, 0, 48, 20, 2),
(110, 'Mango Pickle', 191.000, 0.000, 58, 0, 0, 0, 47, 20, 3),
(111, 'Photato chips', 98.000, 30.000, 99, 0, 0, 0, 17, 95, 0),
(112, '7 up Verified', 90.000, 0.000, 4, 0, 0, 0, 19, 95, 2),
(113, ' Sprite (20 Fl Oz Bottle) varified', 90.000, 0.000, 43, 0, 0, 0, 43, 95, 0),
(114, 'Mango Pickle', 191.000, 0.000, 59, 0, 0, 0, 47, 95, 0),
(115, 'Pran-Sauce-750-gm', 35.000, 0.000, 60, 0, 0, 0, 70, 20, 12),
(116, 'Ishan Tea ', 90.000, 0.000, 0, 0, 0, 0, 14, 17, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shopper_schedule`
--

CREATE TABLE `shopper_schedule` (
  `id` int(11) NOT NULL,
  `shopper_id` int(11) NOT NULL,
  `schedule_day` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`schedule_day`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopper_schedule`
--

INSERT INTO `shopper_schedule` (`id`, `shopper_id`, `schedule_day`) VALUES
(5, 17, '[[\"Sunday\",\"1000\"],[\"Monday\",\"1000\"],[\"Tuesday\",\"7000\"],[\"Wednesday\",\"1000\"],[\"Thursday\",\"1000\"],[\"Friday\",\"10000\"],[\"Saturday\",\"1000\"]]'),
(7, 3, '[[\"Sunday\",\"101\"],[\"Monday\",\"102\"],[\"Tuesday\",\"303\"],[\"Wednesday\",\"304\"],[\"Thursday\",\"405\"],[\"Friday\",\"506\"],[\"Saturday\",\"707\"]]');

-- --------------------------------------------------------

--
-- Table structure for table `util`
--

CREATE TABLE `util` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `util`
--

INSERT INTO `util` (`id`, `label`, `value`) VALUES
(1, 'cart_order_timer', '120'),
(2, 'product_discount', '15'),
(3, 'map_minimum_distance_in_meter', '1000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers_address_details`
--
ALTER TABLE `customers_address_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

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
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `fk_shopper_product_id` (`shopper_product_id`);

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
-- Indexes for table `ordered_product`
--
ALTER TABLE `ordered_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

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
  ADD KEY `customer_profile_id` (`customer_profile_id`),
  ADD KEY `shopper_id` (`shopper_id`),
  ADD KEY `customers_address_details_id` (`customers_address_details_id`);

--
-- Indexes for table `refer`
--
ALTER TABLE `refer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requested_product_stock`
--
ALTER TABLE `requested_product_stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_shopper_id` (`shopper_id`),
  ADD KEY `idx_shopper_product_id` (`shopper_product_id`);

--
-- Indexes for table `shopper_follower`
--
ALTER TABLE `shopper_follower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `shopper_id` (`shopper_id`);

--
-- Indexes for table `shopper_product`
--
ALTER TABLE `shopper_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `shopper_id` (`shopper_id`);

--
-- Indexes for table `shopper_schedule`
--
ALTER TABLE `shopper_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shopper_id` (`shopper_id`);

--
-- Indexes for table `util`
--
ALTER TABLE `util`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `customers_address_details`
--
ALTER TABLE `customers_address_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `customer_profile`
--
ALTER TABLE `customer_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `hero_slider`
--
ALTER TABLE `hero_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `news_comment`
--
ALTER TABLE `news_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `news_like`
--
ALTER TABLE `news_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `ordered_product`
--
ALTER TABLE `ordered_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `refer`
--
ALTER TABLE `refer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `requested_product_stock`
--
ALTER TABLE `requested_product_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `shopper_follower`
--
ALTER TABLE `shopper_follower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `shopper_product`
--
ALTER TABLE `shopper_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `shopper_schedule`
--
ALTER TABLE `shopper_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `util`
--
ALTER TABLE `util`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers_address_details`
--
ALTER TABLE `customers_address_details`
  ADD CONSTRAINT `customers_address_details_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_shopper_product_id` FOREIGN KEY (`shopper_product_id`) REFERENCES `shopper_product` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`shopper_product_id`) REFERENCES `shopper_product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `news_comment`
--
ALTER TABLE `news_comment`
  ADD CONSTRAINT `news_comment_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_comment_ibfk_2` FOREIGN KEY (`commented_by`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `news_like`
--
ALTER TABLE `news_like`
  ADD CONSTRAINT `news_like_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `news_like_ibfk_3` FOREIGN KEY (`liked_by`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`not_from`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`not_to`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ordered_product`
--
ALTER TABLE `ordered_product`
  ADD CONSTRAINT `ordered_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `product_order` (`id`),
  ADD CONSTRAINT `ordered_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `shopper_product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_order`
--
ALTER TABLE `product_order`
  ADD CONSTRAINT `product_order_ibfk_1` FOREIGN KEY (`customer_profile_id`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_order_ibfk_2` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `requested_product_stock`
--
ALTER TABLE `requested_product_stock`
  ADD CONSTRAINT `requested_product_stock_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `customer_profile` (`id`),
  ADD CONSTRAINT `requested_product_stock_ibfk_2` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`),
  ADD CONSTRAINT `requested_product_stock_ibfk_3` FOREIGN KEY (`shopper_product_id`) REFERENCES `shopper_product` (`id`);

--
-- Constraints for table `shopper_follower`
--
ALTER TABLE `shopper_follower`
  ADD CONSTRAINT `shopper_follower_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `customer_profile` (`id`),
  ADD CONSTRAINT `shopper_follower_ibfk_2` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`);

--
-- Constraints for table `shopper_product`
--
ALTER TABLE `shopper_product`
  ADD CONSTRAINT `shopper_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shopper_product_ibfk_2` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `shopper_schedule`
--
ALTER TABLE `shopper_schedule`
  ADD CONSTRAINT `shopper_schedule_ibfk_1` FOREIGN KEY (`shopper_id`) REFERENCES `customer_profile` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
