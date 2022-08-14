import React from 'react'
import { Modal, Text ,View,ActivityIndicator} from "react-native";

const LoadingScreen = ({ loading }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}


        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#fff" />
                <Text
                    style={{
                        color: "#fff",
                        fontWeight:"700"
                    }}
                >Loading Movies</Text>
            </View>
        </Modal>

    )
}

export default LoadingScreen